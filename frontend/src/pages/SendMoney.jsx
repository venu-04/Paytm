import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import emailjs from 'emailjs-com';


export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const email=searchParams.get("email");
    const [amount, setAmount] = useState(0);
    ///
    const [password,setPassword]=useState("");
    // const [showpasswordmodal,setshowPasswordmodal]= useState(false);

    ///
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control the popup message
    const navigate = useNavigate(); // Initialize useNavigate

    console.log(id);
    console.log(name);

    const sendEmail = async () => {
        const templateparams = {
            to_name:name,
            amount: amount,
            to_email:email,
        };
        
        
       

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateparams,
                import.meta.env.VITE_EMAILJS_USER_ID
            );
            console.log("Email sent successfully");
            
        } catch (error) {
            console.error("Error sending email",error);
            
            
        }
    };

    const initiateTransfer = async () => {
        if (!id ||!amount) {
            console.error("Invalid id or amount");
            return;
        }

        try {
            // const response = await axios.post("https://paytm-4-whfq.onrender.com/account/transfer", {
                const response = await axios.post("http://localhost:8000/account/transfer", {
                to: id,
                amount,
                password
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(response.data);
            setShowSuccessMessage(true); // Show success message
            sendEmail();
            setTimeout(() => { // Redirect to dashboard after a delay
                navigate('/dashboard');
            }, 3000); // Adjust the delay as needed
        } catch (error) {
            console.error("Error in transferring:", error);
        }
    };
    // const handleTransferClick = () =>{
    //     if(!amount || amount<=0){
    //         alert("please enter a valid amount");
    //     }
    //     else{
    //         setshowPasswordmodal(true);
    //     }
    // };
    // const handleConfirmPassword = ()=>{
    //     console.log(password);
        
    //     if(!password){
    //         console.error("Invalid password");
    //     }
    //     else{
    //         initiateTransfer();
    //         setshowPasswordmodal(false);
    //     }
    // };

    return (
        <div className="flex justify-center h-screen bg-gray-200">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none" htmlFor="amount">
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button  onClick={initiateTransfer}  className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                                Initiate Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* {showpasswordmodal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bog mb-4">Enter Password</h2>
                        <input type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className='w-full mb-4 p-2 border rounded'
                        placeholder='Enter password'
                        />

                        <div className="flex justify-end space-x-2">
                            <button onClick={()=>setshowPasswordmodal(false)}
                            className='bg-gray-300 px-4 py-2 rounded'
                            >
                                cancel

                            </button>
                            <button onClick={handleConfirmPassword}
                            className='bg-blue-500 text-white px-4 py-2 rounded'>
                                confirm
                            </button>

                        </div>

                    </div>
                </div>
            )} */}
            {showSuccessMessage && ( // Conditional rendering for the success message
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Transaction Successful!</h2>
                        <p>Your money has been sent.</p>
                    </div>
                </div>
            )}
        </div>
    );
};
