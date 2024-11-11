import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../images/signup.webp';

const Home = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleSignin = () => {
    navigate('/signin');
  };

  return (
    <div
      className="bg-cover bg-center h-screen relative"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Gradient overlay for improved contrast */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Main content container */}
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-semibold text-white text-shadow-lg">
          Welcome to Our Platform
        </h1>
        <p className="text-lg md:text-xl text-white opacity-80">
          Join or Sign in to explore the best features.
        </p>

        {/* Buttons */}
        <div className="space-x-4">
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            onClick={handleSignup}
          >
            Signup
          </button>
          <button
            className="bg-green-600 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            onClick={handleSignin}
          >
            Signin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
