import { useState } from "react";

const useCart = () => {
  const [cart, setCart] = useState([]);

  const cartFunc = (item) => {
    setCart([...cart, item]);
  };

  console.log("cart:", cart); // Debugging statement

  return { cart, cartFunc };
};

export default useCart;
