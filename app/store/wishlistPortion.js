"use client";
import { action, persist } from "easy-peasy";

const wishlistPortion = persist({
  wishlistItems: [],

  // Action to add item inside the wishlist.
  addToWishlist: action((state, payload) => {
    // Check if the item is already exist.
    const existingItem = state.wishlistItems.find(
      (item) => item.id === payload.id
    );

    /**
     * If item exists, return (no need to do anything).
     * Otherwise set it inside the wishlistItems.
     */
    if (existingItem) {
      return;
    } else {
      state.wishlistItems.push(payload);
    }
  }),

  // Action to remove item from the wishlist.
  removeFromWishlist: action((state, payload) => {
    state.wishlistItems = state.wishlistItems.filter(
      (item) => item.id !== payload
    );
  }),
});

export default wishlistPortion;
