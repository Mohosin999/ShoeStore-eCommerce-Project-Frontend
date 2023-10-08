"use client";
import { action } from "easy-peasy";

const cartPortion = {
  items: [],
  addToCart: action((state, payload) => {
    // Check if the item is already exist.
    const existingItem = state.items.find((item) => item.id === payload.id);

    /**
     * If item exists, update the quantity and price.
     * Otherwise set it inside the items.
     */
    if (existingItem) {
      existingItem.quantity++;
      // Overwrite the previous price
      existingItem.price = existingItem.attributes.discounted_price
        ? // If there is discount price, multiply it by the quantity
          existingItem.attributes.discounted_price * existingItem.quantity
        : // Else multiply the original price by the quantity
          existingItem.attributes.original_price * existingItem.quantity;
    } else {
      const newItem = {
        ...payload,
        // Set the quantity.
        quantity: 1,
        /**
         * Set price
         * If there is discount price, set it as the price.
         * Else set the original price as the price.
         */
        price: payload.attributes.discounted_price
          ? payload.attributes.discounted_price
          : payload.attributes.original_price,
      };
      // Push the new item inside items
      state.items.push(newItem);
    }

    console.log("Updated Cart Items:", Array.from(state.items));
  }),
  updateCart: action((state, payload) => {}),
  removeCart: action((state, payload) => {}),
};

export default cartPortion;
