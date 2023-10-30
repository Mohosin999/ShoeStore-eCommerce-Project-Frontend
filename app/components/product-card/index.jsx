"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import ButtonLink from "../UI/button-link";

/**
 * A reusable component to display product information and an image.
 *
 * @param {Object} item - Gives your expected item object.
 * @param {Function} onRemove - It's a function to remove the item from wishlist.
 * @returns {JSX.Element} - Returns a component to display product card with information.
 */
const ProductCard = ({ item, onRemove }) => {
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
      <div class="bg-gray-800 p-4">
        <h2 class="text-xl text-center text-gray-200 font-semibold mb-2">
          {item.attributes.name}
        </h2>
        <div className="flex items-center">
          <div>
            {/* Current price */}
            <p class="text-base text-green-500">
              Price:{" "}
              <span class="font-bold pl-3">
                ${item.attributes.discounted_price}
              </span>
            </p>
            {/* Original price */}
            <p class="text-base text-red-400 line-through">
              Original Price:{" "}
              <span class="font-bold pl-3">
                ${item.attributes.original_price}
              </span>
            </p>
          </div>
          <div className="ml-auto">
            <ButtonLink
              href={`/products/${item.attributes.slug}`}
              label="Buy Now"
              className="bg-orange-400 hover:bg-orange-500"
            />
            {/* If onRemove function exist, then this button will be shown. */}
            {onRemove && (
              // <button onClick={onRemove} className="absolute top-0 right-0">
              //   Remove
              // </button>
              <RiDeleteBin6Line
                size={24}
                title="Remove from wishlist !"
                onClick={onRemove}
                className="absolute top-3 right-3 cursor-pointer hover:scale-105 active:scale-95"
              />
            )}
          </div>
        </div>
      </div>
      {/* Product details (name, price) - start */}
    </div>
  );
};

ProductCard.propTypes = {
  item: PropTypes.object.isRequired,
  onRemove: PropTypes.func,
};

export default ProductCard;
