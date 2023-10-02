"use client";
import React, { useState, useEffect } from "react";
import useCart from "../hooks/useCart";
import Wrapper from "../components/wrapper";

const CartPage = () => {
  const { cart } = useCart();
  const [cartItems, setCartItems] = useState([]);

  // Initialize cartItems with the cart data when the component mounts
  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  console.log("cart --> ", cart);
  console.log("cart items --> ", cartItems);

  // Function to increase the quantity of an item
  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
  };

  // Function to decrease the quantity of an item
  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
    }
  };

  // Calculate the total price of all items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item?.data?.data[0]?.attributes?.original_price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <Wrapper>
      <div className="mt-28 bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2">Product</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Price</th>
                <th className="py-2">Total</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td className="py-2">
                    {item?.data?.data[0]?.attributes?.name}
                  </td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">
                    ${item?.data?.data[0]?.attributes?.original_price}
                  </td>
                  <td className="py-2">
                    $
                    {item?.data?.data[0]?.attributes?.original_price *
                      item.quantity}
                  </td>
                  <td className="py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 mr-2"
                      onClick={() => increaseQuantity(index)}
                    >
                      +
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1"
                      onClick={() => decreaseQuantity(index)}
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-2" colSpan="3"></td>
                <td className="py-2 font-bold">Total:</td>
                <td className="py-2 font-bold">${calculateTotalPrice()}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </Wrapper>
  );
};

export default CartPage;
