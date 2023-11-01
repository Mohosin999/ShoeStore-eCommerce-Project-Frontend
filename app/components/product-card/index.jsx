"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import ButtonLink from "../UI/button-link";
import { calculateDiscountPercentage } from "../../lib/utils";

/**
 * A reusable component to display product information and an image.
 *
 * @param {Object} item - Gives your expected item object.
 * @param {Function} onRemove - It's a function to remove the item from wishlist.
 * @returns {JSX.Element} - Returns a component to display product card with information.
 */
const ProductCard = ({ item, onRemove }) => {
  // Get the percentage price in integer.
  const discountPercentage = Math.floor(
    calculateDiscountPercentage(
      item.attributes.original_price,
      item.attributes.discounted_price
    )
  );

  return (
    <div className="w-full rounded overflow-hidden shadow-lg shadow-gray-900 border border-gray-700 select-none relative">
      {/* Product image */}
      <Image
        src={item.attributes.thumbnail.data.attributes.url}
        width={400}
        height={300}
        alt={item.attributes.name}
      />

      {/* Product details (name, price) - start */}
      <div className="bg-gray-800 p-4">
        {/* Product's title */}
        <h2 className="text-xl text-center text-gray-100 font-semibold mt-6">
          {item.attributes.name}
        </h2>

        {/* Product's price and discount. - start */}
        <div className="flex items-center justify-between mt-2">
          {/* Price */}
          <p className="text-base text-gray-100">
            Price:{" "}
            <span className="text-yellow-300 font-bold pl-3">
              {/* If there is no discounted price, original price will be the Price. */}
              $
              {item.attributes.discounted_price
                ? item.attributes.discounted_price
                : item.attributes.original_price}
            </span>
          </p>

          {/* If there is no discounted price, this portion will not be shown. */}
          {/* Original price */}
          {item.attributes.discounted_price ? (
            <p className="text-base text-blue-500">
              <span className="text-gray-100">{discountPercentage}%</span> discount 🔥
            </p>
          ) : (
            <p className="text-base text-blue-500">No Discount 💔</p>
          )}
        </div>
        {/* </div> */}

        {/* Product card buttons - start */}
        <div className="ml-auto">
          <ButtonLink
            href={`/products/${item.attributes.slug}`}
            label="Buy Now"
            className="absolute top-[232px] left-[138px] text-sm"
          />
          {/* If onRemove function exist, then this button will be shown. */}
          {onRemove && (
            <RiDeleteBin6Line
              size={24}
              title="Remove from wishlist !"
              onClick={onRemove}
              className="absolute top-3 right-3 cursor-pointer hover:scale-105 active:scale-95"
            />
          )}
        </div>
        {/* Product card buttons - end */}
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
