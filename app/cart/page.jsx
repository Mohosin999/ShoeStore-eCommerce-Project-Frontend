"use client";
import React from "react";
import useCart from "../hooks/useCart";

const CartPage = () => {
  const { cart } = useCart();

  console.log("cart -> ", cart);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {/* <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.data.attributes.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default CartPage;
