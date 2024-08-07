import React, { useContext, useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import axios from "axios";
import { Mycontext } from "../../components/context";
import { useNavigate } from "react-router-dom";

const Productdetails = () => {
  const { products, Admindelete } = useContext(Mycontext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    category: "",
    Brand: "",
    image: "",
  });

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.price.toString().toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setEditedProduct(product);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async (productId) => {
    try {
      await axios.patch(
        `http://localhost:8000/products/${productId}`,
        editedProduct
      );
      setEditingProductId(null);
    } catch (error) {
      console.error("Failed to update product:", error.message);
    }
  };

  return (
    <>
      <button
        onClick={() => navigate("/addproduct")}
        className="bg-custom-red text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors absolute top-6 right-6 flex items-center"
      >
        <FiPlus className="mr-2" />
        Add Product
      </button>

      <div className="px-4 sm:px-6 lg:px-8 mb-5">
        <div className="relative max-w-lg mx-auto mt-10">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 px-4 pl-10 rounded-full border border-gray-300 bg-white shadow-sm focus:outline-none"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
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
                {editingProductId === item.id ? (
                  <>
                    {["name", "category", "Brand", "price", "image"].map(
                      (field) => (
                        <input
                          key={field}
                          type="text"
                          name={field}
                          value={editedProduct[field]}
                          onChange={handleInputChange}
                          className="w-full mb-1 px-2 py-1 border border-gray-300 rounded"
                        />
                      )
                    )}
                    <button
                      onClick={() => handleUpdateProduct(item.id)}
                      className="bg-custom-red text-white px-4 py-2 rounded-full hover:bg-red-400 transition-colors mt-4"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingProductId(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors mt-4 ml-2"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-medium text-gray-900 mb-1">
                      {item.name}
                    </h2>
                    <p className="text-md text-black mb-1">{item.category}</p>
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-semibold">Brand:</span> {item.Brand}
                    </p>
                    <p className="text-red-600 font-semibold mb-1">
                      ₹ {item.price}
                    </p>
                    <button
                      onClick={() => handleEditClick(item)}
                      className="bg-custom-red text-white px-4 py-2 rounded-full hover:bg-red-400 transition-colors mt-4"
                    >
                      UPDATE
                    </button>
                    <button
                      onClick={() => Admindelete(item.id)}
                      className="bg-custom-red text-white px-4 py-2 rounded-full hover:bg-red-400 transition-colors mt-4"
                    >
                      DELETE
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Productdetails;
