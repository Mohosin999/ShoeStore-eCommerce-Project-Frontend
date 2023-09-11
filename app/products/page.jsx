import React from "react";
import ProductDetails from "../components/product-details/ProductDetails";

const Products = () => {
  // Create an array with 15 elements
  const textComponents = Array.from({ length: 15 }, (_, index) => (
    <div key={index}>
      <ProductDetails />
    </div>
  ));

  return (
    <div class="flex flex-wrap justify-center items-center  mt-[100px]">
      {textComponents}
    </div>
  );
};

export default Products;
