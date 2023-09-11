"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Shoe from "../../../public/shoe.jpg";

const ProductDetails = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      class="max-w-sm rounded overflow-hidden shadow-lg relative border border-gray-700 m-2 mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image src={Shoe} alt="Image description" width={500} height={500} />

      {isHovered && (
        <div class="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 text-white text-center backdrop-blur-sm">
          <h2 class="text-xl font-semibold mb-2">Product Name</h2>
          <p class="text-lg">$50.00</p>
          <Link href="/welcome">Buy Now</Link>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
