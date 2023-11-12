"use client";
import React from "react";
import Button from "../components/UI/button";

/**
 * Success page
 * @returns {JSX.Element}
 */
const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-green-600 font-semibold mb-4">
          Payment Successful
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Thank you for your purchase!
        </p>
        <Button href="/products" label="Continue Shopping..." />
      </div>
    </div>
  );
};

export default SuccessPage;
