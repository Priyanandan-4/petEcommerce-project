import React, { useContext, useState } from 'react';
import { Mycontext } from './context';
import { FiSearch } from 'react-icons/fi';
import Footer from './footer';


const Product = () => {
  const { products, addToCart } = useContext(Mycontext);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.price.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div className="px-4 sm:px-6 lg:px-8 mb-5 ">
      <div>
        <div className="relative max-w-lg mx-auto mt-10">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 px-4 pl-10 rounded-full border border-gray-300 bg-white shadow-sm focus:outline-none"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-24 sm:mb-0 mt-10">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 p-4 flex flex-col justify-between"
          >
            <div className="w-full h-60 mb-3 flex items-center justify-center bg-white rounded-md overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="object-contain h-full w-full"
              />
            </div>
            <div className="text-center flex flex-col flex-grow justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h2>
                <p className="text-md text-black mb-1">{item.category}</p>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Brand:</span> {item.Brand}
                </p>
                <p className="text-red-600 font-semibold mb-1">₹ {item.price}</p>
              </div>
              <div>
                <button
                  className="bg-custom-red text-white px-4 py-2 rounded-full hover:bg-red-400 transition-colors mt-4"
                  onClick={() => {addToCart(item);}}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Product;
