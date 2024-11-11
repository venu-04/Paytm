import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../images/paytm_img.png';

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSignup = () => {
    navigate('/signup'); // Navigate to the Signup page
  };

  const handleSignin = () => {
    navigate('/signin'); // Navigate to the Signin page
  };

  return (
    <div
      className="bg-cover bg-center h-screen relative"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute top-0 right-0 m-4 space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSignup}
        >
          Signup
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSignin}
        >
          Signin
        </button>
      </div>
      <div className="flex items-center justify-center h-full text-center">
      </div>
    </div>
  );
};

export default Home;
