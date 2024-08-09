import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';

export const Mycontext = createContext();

const Context = ({ children }) => {
  const [products, setProduct] = useState([]);
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  // const [userdetail, setuserdetail] = useState();
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (id) {
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/products`)
      .then((item) => setProduct(item.data))
      .catch((error) => console.log(error));
  }, []);

const Admindelete=(itemid)=>{
  axios.delete(`http://localhost:8000/products/${itemid}`)
    .then(()=>{
      const Updateproduct=products.filter(
        (product)=>product.id !== itemid
      );
      setProduct(Updateproduct)
    })
    .catch((error)=>{
      console.log(error);
      
    })
}
  useEffect(() => {
    axios
      .get(`http://localhost:8000/user`)
      .then((res) => setUser(res.data))
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/user/${id}`)
        .then((res) => setCart(res.data.cart))
        .catch((error) => console.log("error", error));
    }
  }, [id]);
  

  const removeCart = (item) => {
    const updatedCart = cart.filter((elem) => elem.id !== item.id);
    setCart(updatedCart);
    axios.patch(`http://localhost:8000/user/${id}`, { cart: updatedCart });
  };
  let size = cart.length;

  const updateQty = (product, num) => {
    if (product.Qty === 1 && num === -1) return;

    const newQty = cart.map((item) =>
      item.id === product.id ? { ...item, Qty: item.Qty + num } : item
    );
    setCart(newQty);

    axios
      .patch(`http://localhost:8000/user/${id}`, { cart: newQty })
      .then((res) => console.log("done"))
      .catch((error) => console.log("error", error));
  };

  const addToCart = (elem) => {
    if(!id){
      alert("please login")
    }
    else{
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === elem.id);
  
        let updatedCart;
  
        if (existingProduct) {
          
          updatedCart = prevCart.map((item) =>
            item.id === elem.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          updatedCart = [...prevCart, { ...elem, quantity: 1 }];
        }
  
        if (id) {
          axios
            .patch(`http://localhost:8000/user/${id}`, { cart: updatedCart })
            .then(() => console.log("Cart updated in backend"))
            .catch((error) =>
              console.error("Error updating cart in backend:", error)
            );
            toast.success("item added")
            
        }
       
  
        return updatedCart;
      });
    }
    
  };

  return (
    <Mycontext.Provider
      value={{
        updateQty,
        removeCart,
        products,
        user,
        cart,
        addToCart,
        size,
        isLogged,
        setIsLogged,
        Admindelete,
        setCart
      }}
    >
      {children}
    </Mycontext.Provider>
  );
};

export default Context;
