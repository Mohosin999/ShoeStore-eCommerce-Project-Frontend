"use client";
import { createStore } from "easy-peasy";
import cartPortion from "./cartPortion";
import wishlistPortion from "./wishlistPortion";

const store = createStore({
  cartPortion,
  wishlistPortion,
});

export default store;
