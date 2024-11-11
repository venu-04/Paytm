import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import image from '../images/signup.webp';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => { 
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/user/signin", { username, password });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.error('API Error:', error.response.data);
        setError(`Error: ${error.response.data.message}`);
      } else {
        console.error('Network Error:', error.message);
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center"
    //  style={{ backgroundImage: `url(${image})` }}
     >
      <div className=" p-8 rounded-lg shadow-lg shadow-gray-500/50 w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              required
              className="mt-1 block w-full bg-transparent border-0 border-b-2 border-gray-400 focus:border-gray-200 focus:ring-0 text-gray-800"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              required
              className="mt-1 block w-full bg-transparent rounded-md border-0 border-b-2 border-gray-300  focus:border-indigo-300 focus:ring-0 text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;





// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import image from '../images/signup.webp';

// const Signin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // const response = await axios.post("https://paytm-4-whfq.onrender.com/user/signin", { username, password });
//       const response = await axios.post("http://localhost:8000/user/signin", { username, password });
//       // Assuming the response contains a token for authenticated sessions
//       localStorage.setItem("token", response.data.token);
//       navigate("/dashboard"); // Redirect to dashboard after successful signin
//     } catch (err) {
//       setError(err.response?.data?.message || "An error occurred during signin.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center"  style={{ backgroundImage: `url(${image})` }}>
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               placeholder="Enter Username"
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter Password"
//               required
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           {error && <div className="text-red-500">{error}</div>}
//           <button
//             type="submit"
//             className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signin;
