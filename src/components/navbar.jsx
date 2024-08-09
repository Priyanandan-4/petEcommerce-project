import React, { useContext, useState, useRef, useEffect } from "react";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Mycontext } from "./context";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const dropdownRef = useRef(null);

  // context  
  const { size, isLogged, setIsLogged } = useContext(Mycontext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle dropdown visibility
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  // Handle logout and show dropdown
  const handleLogout = () => {
    const id = localStorage.getItem('id'); // Retrieve email from localStorage
    axios.get(`http://localhost:8000/user/${id}`)
    .then(res=>setUserEmail(res.data.email))
    toggleDropdown(); 
  };

  // Handle logout confirmation
  const confirmLogout = () => {
    localStorage.clear();
    setIsLogged(false);
    setIsDropdownVisible(false); // Hide the dropdown
    navigate("/signup"); // Redirect to signup page
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="font-sans">
      <nav className="bg-gray-300 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn.shopify.com/s/files/1/0086/0795/7054/files/logo_1.svg?v=1709198253"
              loading="lazy"
              alt="logo"
              className="w-32 sm:w-40 md:w-48 lg:w-56 pl-10"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart">
              <button className="relative flex items-center justify-center text-black p-2 rounded-full">
                <FiShoppingCart className="text-2xl" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{size}</span>
              </button>
            </Link>

            {isLogged ? (
              <div className="relative">
                <button
                  className="bg-gray-400 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  onClick={handleLogout}
                >
                  <CgProfile className="text-2xl" />
                </button>
                {/* Dropdown */}
                {isDropdownVisible && (
                  <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg z-50">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      <p>Your email:{userEmail}</p>
                    </div>
                    <div className="flex justify-end px-4 py-2 border-t border-gray-300">
                      <button
                        className="px-4 py-2 bg-gray-300 rounded mr-2"
                        onClick={() => setIsDropdownVisible(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={confirmLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signup">
                <button className="bg-gray-400 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                  Login
                </button>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart">
              <button className="relative flex items-center justify-center bg-red-800 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                <FiShoppingCart className="text-2xl" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{size}</span>
              </button>
            </Link>
            <FiMenu className="text-2xl text-gray-600" onClick={toggleMenu} />
          </div>
        </div>
      </nav>

      <nav className="bg-custom-red text-white">
        <div className="container mx-auto px-4">
          <ul className="hidden md:flex justify-center space-x-8">
            <li>
              <Link to="/" className="block py-3 px-3 hover:bg-red-600 rounded-3xl transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="block py-3 px-3 hover:bg-red-600 transition duration-300 rounded-3xl">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-3 px-3 hover:bg-red-600 transition duration-300 rounded-3xl">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/category" className="block py-3 px-3 hover:bg-red-600 transition duration-300 rounded-3xl">
                Category
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className={`md:hidden bg-red-800 ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-2">
            <Link to="/" className="text-white hover:bg-red-900 py-2 px-4 rounded transition duration-300">Home</Link>
            <Link to="/products" className="text-white hover:bg-red-900 py-2 px-4 rounded transition duration-300">Products</Link>
            <Link to="/about" className="text-white hover:bg-red-900 py-2 px-4 rounded transition duration-300">About Us</Link>

            {isLogged ? (
              <button
                className="text-white hover:bg-red-900 py-2 px-4 rounded transition duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link to="/signup">
                <button className="bg-gray-400 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors">
                  <CgProfile className="text-2xl" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
