import React from "react";
import Footer from "./footer";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="relative w-full h-screen bg-customGray">
      <div className="flex flex-col md:flex-row h-full">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-white z-10">
            <h1 className="text-5xl font-extrabold mb-6 text-black">
              <span className="text-edu-au">W</span>elcome to Pet Food Store
            </h1>
            <p className="text-xl mb-8 text-black">
              Explore our wide range of premium pet foods and accessories. From
              dogs and cats to birds and fish, we have everything your pets need
              to stay happy and healthy.
            </p>
            <Link to="/products">
              <button className="bg-custom-red text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-3/4 h-auto shadow-2xl rounded-lg">
            <img
              src="https://img.freepik.com/free-photo/beautiful-dog-with-nutritious-food_23-2150742783.jpg?t=st=1722511284~exp=1722514884~hmac=43cff8a22959a27f4623c6db6bbeadd8972ee8c69de83eae3f4664431ea0e0ac&w=996"
              alt="Pet Food"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
