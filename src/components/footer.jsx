import React from 'react';




const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Fur-Friends Food Store</h2>
          <p className="text-gray-400">
            Your one-stop shop for all your pet's food needs. We provide a variety of healthy and delicious options to keep your furry friends happy and healthy.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2"><a href="#" className="hover:underline">Home</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">Shop</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">About Us</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/pawpaw_petfood?igsh=MXN6YzhpNGthczJvdQ== " className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-pinterest"></i></a>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400 mb-2">Email: furfriends@gmail.com</p>
          <p className="text-gray-400">Phone: +91 8129278755</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
        <p>&copy; 2024 Fur-Friends Food Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
