"use client";
import React from "react";
import Image from "next/image";
import { useStoreActions, useStoreState } from "easy-peasy";
// Components
import ProductCard from "../components/product-card";
import Wrapper from "../components/wrapper";
import emptyBox from "../../public/emptyBox.jpg";

/**
 * Wishlist page
 * @returns {JSX.Element}
 */
const Wishlist = () => {
  const { wishlistItems } = useStoreState((state) => state.wishlistPortion);
  const { removeFromWishlist } = useStoreActions(
    (actions) => actions.wishlistPortion
  );

  //   Function to remove item from the wishlist.
  const handleRemoveFromWishlist = (itemId) => {
    removeFromWishlist(itemId);
  };

  return (
    <Wrapper>
      <div className="mt-[6.5rem] lg:mt-32">
        {/* Page title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-200 font-bold text-center mb-4">
          Wishlist
        </h1>

        {wishlistItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6 md:gap-y-10">
            {wishlistItems?.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onRemove={() => handleRemoveFromWishlist(item.id)}
              />
            ))}
          </div>
        )}

        {/* This is empty screen */}
        {wishlistItems.length < 1 && (
          <div className="flex flex-col items-center justify-center my-16">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-200 font-bold">
              Empty Wishlist 😞
            </h1>
            <Image
              src={emptyBox}
              alt="empty-box"
              className="w-96 h-auto my-10"
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Wishlist;
