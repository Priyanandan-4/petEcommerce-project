import React, { useContext, useEffect } from 'react';
import { Mycontext } from './context';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cart() {
  const { cart, updateQty, removeCart, setCart } = useContext(Mycontext);
  const navigate = useNavigate();
  const id = localStorage.getItem('id');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/user/${id}`)
        .then(res => setCart(res.data.cart))
        .catch(error => console.log(error));
    }
  }, [id, setCart]);



  const handleBuyNow = () => {
    if (cart.length > 0) {
      navigate('/');
    }
  };


  
  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cart.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <ul>
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border-b border-gray-200 p-4"
                >
                  <img
                    className="w-20 h-20 object-cover"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  </div>
                  <div className="text-lg font-bold text-gray-800">₹{item.price}</div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
                      onClick={() => updateQty(item, -1)}
                      aria-label="Decrease quantity"
                      disabled={item.Qty <= 1}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12h12" />
                      </svg>
                    </button>
                    <span className="text-lg font-semibold">{item.Qty}</span>
                    <button
                      className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
                      onClick={() => updateQty(item, 1)}
                      aria-label="Increase quantity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12M6 12h12" />
                      </svg>
                    </button>
                  </div>
                  <button
                    className="ml-4 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                    onClick={() => removeCart(item)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between p-4 bg-gray-100 border-t border-gray-200">
              <span className="text-xl font-bold">
                Total Price: ₹{cart.reduce((acc, item) => acc + item.Qty * item.price, 0)}
              </span>
              <Link to='/payment'>
              <button
                className={`bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors font-bold ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleBuyNow}
                disabled={cart.length === 0}
              >
                Buy Now
              </button>
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-red-600 text-2xl text-center mt-20">Cart is Empty</p>
        )}
      </div>
    </>
  );
}

export default Cart;
