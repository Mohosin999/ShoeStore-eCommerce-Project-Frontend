// useCart.js
import { useState, useEffect } from "react";

const useCart = () => {
  const [cart, setCart] = useState([]);

  // Load cart data from localStorage on initial render
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart1 = (product) => {
    // Create a copy of the current cart and add the product to it
    const updatedCart = [...cart, product];
    setCart(updatedCart);
  };

  console.log("cart from hook -> ", cart);

  return { cart, addToCart1 };
};

export default useCart;
