import React, { useState } from "react";
import Image from "next/image";
import ButtonLink from "../UI/button-link/ButtonLink";

function ProductCard({ item }) {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <div
      className="w-fit rounded overflow-hidden shadow-lg shadow-gray-900 relative border border-gray-700 m-2"
      onMouseEnter={() => setHoveredProduct(item.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      <Image
        src={item.attributes.thumbnail.data.attributes.url}
        width={350}
        height={350}
        alt={item.name}
      />

      <div className="bg-gray-800 p-4 text-center">
        <h2 className="text-xl text-gray-200 font-semibold mb-2">
          {item.attributes.name}
        </h2>
        <p className="text-lg text-red-400">
          Original Price:{" "}
          <span className="font-bold pl-3">
            ${item.attributes.original_price}
          </span>
        </p>
        <p className="text-lg text-green-500">
          Discounted Price:{" "}
          <span className="font-bold pl-3">
            ${item.attributes.discounted_price}
          </span>
        </p>
      </div>

      {hoveredProduct === item.id && (
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center backdrop-blur-sm">
          <div className="text-center">
            <ButtonLink href="/" label="Buy Now" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
