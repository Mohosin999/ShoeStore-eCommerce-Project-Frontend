"use client";
import React from "react";
import Wrapper from "../components/wrapper";
import { useStoreState } from "easy-peasy";

const CartPage = () => {
  const { items } = useStoreState((state) => state.cartPortion);

  return (
    <Wrapper>
      <div className="mt-32 text-gray-200 text-center">
        <h1 className="text-4xl font-bold">Shopping Cart</h1>

        <div className="w-4/5 mx-auto">
          <table className="w-full text-center mt-6">
            <thead>
              <tr className="text-2xl text-green-500">
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="text-lg shadow-sm shadow-gray-700">
                  <td className=" py-4">{item.attributes.name}</td>
                  <td className=" py-4">{item.quantity}</td>
                  <td className=" py-4">
                    {item.attributes.discounted_price
                      ? item.attributes.discounted_price
                      : item.attributes.original_price}
                  </td>
                  <td className=" py-4">{item.price}</td>
                  <td className=" py-4">Your actions here</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
};

export default CartPage;
