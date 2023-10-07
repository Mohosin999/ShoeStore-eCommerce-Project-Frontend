"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "../components/wrapper";

const CartPage = () => {
  return (
    <Wrapper>
      <div className="mt-28 bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

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
            <tr>
              <td className="py-2"></td>
              <td className="py-2"></td>
              <td className="py-2"></td>
              <td className="py-2"></td>
              <td className="py-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 mr-2"></button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1"></button>
              </td>
            </tr>
            <tr>
              <td className="py-2" colSpan="3"></td>
              <td className="py-2 font-bold"></td>
              <td className="py-2 font-bold"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default CartPage;
