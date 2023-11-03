"use client";
import { action, persist } from "easy-peasy";

const cartPortion = persist({
  items: [],
  recentOrderId: null,

  // Action to add item inside the cart.
  addToCart: action((state, payload) => {
    // Check if the item is already exist.
    const existingItem = state.items.find((item) => item.id === payload.id);

    /**
     * If item exists, return (no need to do anything).
     * Otherwise set it inside the items.
     */
    if (existingItem) {
      return;
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
  }),

  // Action to update the item.
  updateCart: action((state, payload) => {
    // Find the item that you want to update in the cart.
    const itemToUpdate = state.items.find((item) => item.id === payload.id);

    if (itemToUpdate) {
      // Update the quantity of the item.
      itemToUpdate.quantity = payload.quantity;

      // Update the price based on the new quantity.
      itemToUpdate.price = itemToUpdate.attributes.discounted_price
        ? itemToUpdate.attributes.discounted_price * itemToUpdate.quantity
        : itemToUpdate.attributes.original_price * itemToUpdate.quantity;
    }
  }),

  // Action to remove item from the cart.
  removeCart: action((state, payload) => {
    state.items = state.items.filter((item) => item.id !== payload.id);
  }),

  // Action to clear all items inside the cart.
  clearAllCart: action((state, payload) => {
    state.items = []; // Set the items array to an empty array to clear the cart.
  }),

  // ===========================================================
  // Action to add recent order id.
  addRecentOrderId: action((state, payload) => {
    state.recentOrderId = payload;
  }),
});

export default cartPortion;
