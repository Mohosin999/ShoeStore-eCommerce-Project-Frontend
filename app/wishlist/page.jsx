"use client";
import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import ProductCard from "../components/product-card";
import Wrapper from "../components/wrapper";

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
      <div className="grid grid-cols-4 gap-x-5 gap-y-10 mt-32">
        {wishlistItems?.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onRemove={() => handleRemoveFromWishlist(item.id)}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default Wishlist;
