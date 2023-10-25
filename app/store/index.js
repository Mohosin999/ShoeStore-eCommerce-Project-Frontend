"use client";
import { createStore } from "easy-peasy";
import cartPortion from "./cartPortion";
import registerUser from "./registerUser";
import loginUser from "./loginUser";

const store = createStore({
  cartPortion,
  registerUser,
  loginUser,
});

export default store;
