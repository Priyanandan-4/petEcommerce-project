import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', Brand: '', image: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/products', newProduct);
      navigate('/products'); // Redirect to the products list after adding
    } catch (error) {
      console.error('Failed to add product:', error.message);
    }
  };


  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-10 bg-white rounded-3xl border-2 border-gray-100">
        <h1 className="text-3xl font-bold mb-4">Add New Product</h1>
        <form onSubmit={handleAddProduct}>
          {['name', 'category', 'Brand', 'price', 'image'].map(field => (
            <div key={field} className="flex flex-col mb-4">
              <label htmlFor={field} className="text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                id={field}
                name={field}
                value={newProduct[field]}
                onChange={handleInputChange}
                className="w-full border-2 border-gray-300 rounded-xl p-2 mt-1"
                placeholder={`Enter product ${field}`}
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="py-2 px-4 bg-custom-red text-white rounded-full hover:bg-red-600 transition-colors"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
