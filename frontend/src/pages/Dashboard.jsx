import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`hhttps://paytm-4-whfq.onrender.com/user/bulk?filter=${filter}`);
                setUsers(response.data.user);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users.');
            }
        };

        fetchUsers();
    }, [filter]);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://paytm-4-whfq.onrender.com/account/balance", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
                setError('Failed to fetch balance.');
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="shadow h-14 flex justify-between p-4">
                <div className="flex flex-col justify-center h-full ml-4">
                    <h1 className="text-xl font-bold">PayTM App</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex flex-col justify-center h-full mr-4">
                        <span>Hello</span>
                    </div>
                    <div className="rounded-full h-12 w-12 bg-blue-500 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full text-xl text-white">
                            U
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Your Balance</h2>
                    <div className="flex items-center">
                        <span className="font-semibold text-lg">{balance!== null? `Rs ${balance}` : "Loading..."}</span>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Users</h2>
                    <input
                        onChange={(e) => setFilter(e.target.value)}
                        type="text"
                        placeholder="Search users..."
                        className="w-full px-2 py-1 border rounded border-gray-300"
                    />
                    {error && <div className="text-red-500 mt-2">{error}</div>}
                    {users && users.length > 0? (
                        users.map(user => (
                            <article className="flex justify-between items-center mb-4 last:mb-0" key={user.userId}>
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-full h-12 w-12 bg-gray-200 flex justify-center">
                                        <span className="text-xl text-gray-700">{user.firstName[0]}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">{`${user.firstName} ${user.lastName}`}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/send?id=${user.userId}&name=${user.firstName}`)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Send Money
                                </button>
                            </article>
                        ))
                    ) : (
                        <div className="mt-2">No users found</div>
                    )}
                </section>
            </main>
        </div>
    );
};
