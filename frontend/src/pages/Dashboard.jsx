import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         if (filter) { // Fetch users only if there is a search term
    //             try {
    //                 const response = await axios.get(`http://localhost:8000/user/bulk?filter=${filter}`);
    //                 setUsers(response.data.user);
    //                 setError(null); // Clear previous errors
    //             } catch (error) {
    //                 console.error('Error fetching users:', error);
    //                 setError('Failed to fetch users.');
    //             }
    //         } else {
    //             setUsers([]); // Clear users if no search term
    //         }
    //     };

    //     fetchUsers();
    // }, [filter]);
    
    useEffect(() => {
        const fetchUsers = async () => {
            if (filter.length >0) { // Set a minimum length for search
                try {
                    const response = await axios.get(`https://paytm-6.onrender.com/bulk?filter=${filter}`);
                    
                    // Debugging: Log the response to confirm data structure
                    console.log('Fetched users:', response.data);
    
                    setUsers(response.data.user); // Update based on actual response structure
                    setError(null); // Clear previous errors
                } catch (error) {
                    console.error('Error fetching users:', error);
                    setError('Failed to fetch users.');
                }
            } else {
                setUsers([]); // Clear users if search term is too short
            }
        };
    
        fetchUsers();
    }, [filter]);
    
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://paytm-6.onrender.com/account/balance", {
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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
    {/* Container with a max width for consistent size */}
    <div className="container max-w-9xl w-full px-6 py-8">
        {/* Header Section */}
        <header className="bg-white shadow-sm rounded-lg border border-gray-200 p-4 flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">PayTM App</h1>
            <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium">Hello,</span>
                <div className="rounded-full h-10 w-10 bg-gray-500 flex items-center justify-center text-white font-bold">
                    U
                </div>
            </div>
        </header>

        {/* Main Section */}
        <main className="space-y-6">
            {/* Balance Section */}
            <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Balance</h2>
                <p className="text-lg text-gray-700 font-medium">
                    {balance !== null ? `Rs ${balance}` : "Loading..."}
                </p>
            </section>

            {/* Users Section */}
            <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex flex-col mb-4 space-y-2">
                    <h2 className="text-xl font-semibold text-gray-800">Users</h2>
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    {error && <div className="text-red-500 mt-2">{error}</div>}
                </div>

                {users && users.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <article
                                key={user.userId}
                                className="flex justify-between items-center py-4"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-full h-10 w-10 bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                                        {user.firstName ? user.firstName[0] : "?"}
                                    </div>
                                    <span className="font-medium text-gray-800">
                                        {`${user.firstName} ${user.lastName}`}
                                    </span>
                                </div>
                                <button
                                    onClick={() => navigate(`/send?id=${user.userId}&name=${user.firstName}&email=${user.username}`)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-black-700 shadow transition-all duration-200 ease-in-out transform hover:scale-105"
                                >
                                    Send Money
                                </button>
                            </article>
                        ))}
                    </div>
                ) : (
                    filter && (
                        <div className="mt-4 text-gray-500 text-center">No users found</div>
                    )
                )}
            </section>
        </main>
    </div>
</div>

    
    );
};
