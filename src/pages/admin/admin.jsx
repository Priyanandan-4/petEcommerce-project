import React from 'react';
import { FiShoppingCart, FiUsers } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import Productdetails from './productdetails';

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication data or tokens
    localStorage.removeItem('id'); // Example: Remove user id from local storage
    // You can also clear context or any other authentication state if needed

    // Redirect to sign-in page
    navigate('/login');
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div>
        {/* Header */}
        <header className="p-4 mb-6 flex items-center justify-between w-full">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-custom-red text-white px-4 py-2 rounded-lg hover:bg-red-800 transition duration-300"
          >
            Logout
          </button>
        </header>

        {/* Options Section */}
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-screen-md">
            {/* Product Details */}
            <Link to="/adminproduct">
            <div
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-50 transition duration-300 mt-40 w-64 h-64 flex flex-col justify-center"
            >
              <div className="flex items-center mb-4">
                <FiShoppingCart className="text-custom-red text-4xl mr-3" />
                <h2 className="text-xl font-semibold">Product Details</h2>
              </div>
              <p className="text-gray-600">Manage and view all products.</p>
            </div>
            </Link>

            {/* User Details */}
            <Link to="/userdetails">
            <div
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-50 transition duration-300 mt-40 w-64 h-64 flex flex-col justify-center"
              
            >
              <div className="flex items-center mb-4">
                <FiUsers className="text-black text-4xl mr-3" />
                <h2 className="text-xl font-semibold">User Details</h2>
              </div>
              <p className="text-gray-600">Manage and view all users.</p>
              
            </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome
