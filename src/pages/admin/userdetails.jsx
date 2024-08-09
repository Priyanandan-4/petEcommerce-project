import axios from "axios";
import React, { useEffect, useState } from "react";
import Usermodal from "./usermodal";
// import Order from "./";

const Userdetails = () => {
  const [list, setList] = useState([]);
  const [usersearch, setUserSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/user")
      .then((res) => setList(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  const handleOrderClick = (user) => {
    setSelectedUser(user);
    setIsOrderModalOpen(true);
  };
  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:8000/user/${userId}`)
      .then((response) => {
        setList(list.filter((user) => user.id !== userId));
      })
      .catch((error) => console.log(error));
  };

  const UserData = list.filter(
    (item) =>
      item.username.toLowerCase().includes(usersearch.toLowerCase()) 
      // item.id.toLowerCase().includes(usersearch.toLowerCase()) ||
      // item.email.toLowerCase().includes(usersearch.toLowerCase())
  );

  return (
    <div>
      <div className="text-black font-bold text-3xl flex justify-center p-4">
        <h1>User Details</h1>
      </div>
      <div className=" flex justify-center p-5">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 md: border border-gray-400 rounded-md px-4 py-2 mb-6"
          value={usersearch}
          onChange={(e) => setUserSearch(e.target.value)}
        />
      </div>

      <div className="p-4 w-full overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="border-b border-black bg-custom-red">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
               <th className="py-2 px-4">Cart</th>
              <th className="py-2 px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {UserData.map((item) => (
              <tr
                key={item.id}
                className="border-b cursor-pointer hover:bg-gray-100 text-center border-gray-400"
              >
                <td className="py-2 px-4 text-black">{item.id}</td>
                <td className="py-2 px-4 text-black">{item.username}</td>
                <td className="py-2 px-4 text-black">{item.email}</td>
                <td className="py-2 px-4">
                  <button
                    className="bg-black text-white p-2 rounded-lg font-bold"
                    onClick={() => handleOrderClick(item)}
                  >
                    Cart
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button
                    className="bg-black text-white p-2 rounded-lg font-bold"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {selectedUser && (
          <Order
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            user={selectedUser}
          />
        )} */}
        {selectedUser && (
          <Usermodal
            isOpen={isOrderModalOpen}
            onClose={handleCloseOrderModal}
            user={selectedUser}
          />
        )}
      </div>
    </div>
  );
};

export default Userdetails;
