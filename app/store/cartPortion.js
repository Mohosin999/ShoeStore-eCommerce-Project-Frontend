"use client";
import { action } from "easy-peasy";

const cartPortion = {
  items: [],
  addToCart: action((state, payload) => {
    // Check if the item is already exist
    const existingItem = state.items.find((item) => item.id === payload.id);

    /**
     * If exists, update the quantity and price.
     * Otherwise set it inside the items.
     */
    if (existingItem) {
      existingItem.quantity++;
      /**
       * If discount price exist, update it.
       * Otherwise update original price.
       */
      if (existingItem.attributes.discounted_price) {
        existingItem.attributes.discounted_price * existingItem.quantity;
      } else {
        existingItem.attributes.original_price * existingItem.quantity;
      }
    } else {
      state.items.push({ ...payload, quantity: 1 });
    }
  }),
  updateCart: action((state, payload) => {}),
  removeCart: action((state, payload) => {}),
};

export default cartPortion;
