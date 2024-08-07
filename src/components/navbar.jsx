import React, { useContext, useState } from "react";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Link, Outlet } from "react-router-dom";
import { Mycontext } from "./context";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { size, isLogged, setIsLogged,Admindelete } = useContext(Mycontext);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  console.log(size);

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
              <Link to="/login">
                <button
                  onClick={() => {
                    setIsLogged(false);
                    localStorage.clear();
                  }}
                >
                  Logout
                </button>
              </Link>
            ) : (
              <Link to="/signup">
                <button className="bg-gray-400 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                  <CgProfile className="text-2xl" />
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
              <Link to="/about" className="block py-3 px-3 hover:bg-red-600 transition duration-300 rounded-3xl">
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
              <Link to="/login">
                <button
                  className="text-white hover:bg-red-900 py-2 px-4 rounded transition duration-300"
                  onClick={() => {
                    setIsLogged(false);
                    localStorage.clear();
                  }}
                >
                  Logout
                </button>
              </Link>
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
