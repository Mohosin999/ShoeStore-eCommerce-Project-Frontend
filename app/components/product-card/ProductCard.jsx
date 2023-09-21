"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import ButtonLink from "../UI/button-link/ButtonLink";

/**
 * A reusable component to display product information and an image.
 *
 * @param {Object} item - Gives your expected item object.
 * @returns {JSX.Element} - Returns a component to display product card with information.
 */
const ProductCard = ({ item }) => {
  // State to track whether the product is being hovered.
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <div
      class="w-full rounded overflow-hidden shadow-lg shadow-gray-900 relative border border-gray-700 select-none"
      onMouseEnter={() => setHoveredProduct(item.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      {/* Product image */}
      <Image
        src={item.attributes.thumbnail.data.attributes.url}
        width={400}
        height={300}
        objectFit="cover"
        alt={item.name}
      />

      {/* Product details (name, price) - start */}
      <div class="bg-gray-800 p-4 text-center">
        <h2 class="text-xl text-gray-200 font-semibold mb-2">
          {item.attributes.name}
        </h2>
        <p class="text-lg text-red-400">
          Original Price:{" "}
          <span class="font-bold pl-3">${item.attributes.original_price}</span>
        </p>
        <p class="text-lg text-green-500">
          Discounted Price:{" "}
          <span class="font-bold pl-3">
            ${item.attributes.discounted_price}
          </span>
        </p>
      </div>
      {/* Product details (name, price) - start */}

      {/* If the product is hovered, buy_now button will show - start */}
      {hoveredProduct === item.id && (
        <div class="absolute inset-0 flex flex-col justify-center items-center text-white text-center backdrop-blur-sm">
          <div class="text-center">
            <ButtonLink
              href={`/products/${item.attributes.slug}`}
              label="Buy Now"
              className="bg-orange-400 hover:bg-orange-500"
            />
          </div>
        </div>
      )}
      {/* If the product is hovered, buy_now button will show - end */}
    </div>
  );
};

ProductCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ProductCard;
