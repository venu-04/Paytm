import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import image from '../images/signup.webp';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/user/signup", formData);
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/signin");
    } catch (error) {
      if (error.response) {
        console.error('API Error:', error.response.data);
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error('Network Error:', error.message);
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <div 
      className="flex items-center justify-center h-screen bg-cover bg-center " 
      // style={{ backgroundImage: `url(${image})` }}
    >
      <div className="p-8 w-80 bg-opacity-50 shadow-lg shadow-gray-500/50">
        <h1 className="text-2xl font-bold mb-4 text-center text-black-200">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-black-300">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Enter Username" 
              required 
              className="mt-1 block w-full bg-transparent border-0 border-b-2 border-gray-400 focus:border-gray-200 focus:ring-0 text-gray-100" 
              value={formData.username} 
              onChange={handleChange} 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-black-300">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              placeholder="Enter First Name" 
              required 
              className="mt-1 block w-full bg-transparent border-0 border-b-2 border-gray-400 focus:border-gray-200 focus:ring-0 text-gray-100" 
              value={formData.firstName} 
              onChange={handleChange} 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-black-300">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              placeholder="Enter Last Name" 
              required 
              className="mt-1 block w-full bg-transparent border-0 border-b-2 border-gray-400 focus:border-gray-200 focus:ring-0 text-gray-100" 
              value={formData.lastName} 
              onChange={handleChange} 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-black-300">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter Password" 
              required 
              className="mt-1 block w-full bg-transparent border-0 border-b-2 border-gray-400 focus:border-gray-200 focus:ring-0 text-gray-100" 
              value={formData.password} 
              onChange={handleChange} 
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2 text-sm font-medium text-gray-200 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Sign Up
          </button>
          <p className="mt-4 text-center text-black-400">
            Already have an account? <Link to="/signin" className="text-gray-200 hover:text-black-300">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;








// import  { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const Signup = () => {
//  const [formData, setFormData] = useState({
//     username: '',
//     firstName: '',
//     lastName: '',
//     password: '',
//  });
//  const navigate = useNavigate();

//  const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value });
//  };

 
// const handleSubmit = async (event) => {
//   event.preventDefault();


//   console.log(formData);

//   // await axios.post("http://localhost:8000/user/signup", formData)
//   //   .then(response => {
//   //     console.log(response.data);
      
      
//   //     localStorage.setItem("token", response.data.token);
//   //     navigate("/signin");
//   //   })
//   //   .catch(error => {
//   //     if (error.response) {
//   //       console.log(error.response.data);
//   //       console.log("Error status:", error.response.status);
//   //       console.log("Headers:", error.response.headers);
//   //     } else {
//   //       console.log("Error:", error.message);
//   //     }
//   //   });
//   try {
//     const response = await axios.post("http://localhost:8000/user/signup", formData);
//     console.log(response.data);
    
//     localStorage.setItem("token", response.data.token);
//     navigate("/signin");
// } catch (error) {
//     if (error.response) {
//         console.error('API Error:', error.response.data);
//         alert(`Error: ${error.response.data.message}`);
//     } else {
//         console.error('Network Error:', error.message);
//         alert('An unexpected error occurred');
//     }
// }
// };

//  return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-80">
//         <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
//             <input type="text" id="username" name="username" placeholder="Enter Username" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={formData.username} onChange={handleChange} />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
//             <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={formData.firstName} onChange={handleChange} />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
//             <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={formData.lastName} onChange={handleChange} />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input type="password" id="password" name="password" placeholder="Enter Password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={formData.password} onChange={handleChange} />
//           </div>
//           <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</button>
//           <p className="mt-4 text-center text-gray-500">Already have an account? <Link to="/signin" className="text-indigo-500 hover:text-indigo-700">Sign In</Link></p>
//         </form>
//       </div>
//     </div>
//  );
// };

// export default Signup;



