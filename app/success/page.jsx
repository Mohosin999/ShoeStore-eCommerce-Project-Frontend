import React from "react";
import ButtonLink from "../components/UI/button-link";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl text-green-600 font-semibold mb-4">
          Payment Successful
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your purchase!
        </p>
        <ButtonLink href="/products" label="Continue Shopping..." />
      </div>
    </div>
  );
};

export default SuccessPage;
