"use client";
import React from "react";
import { StoreProvider } from "easy-peasy";
import store from "../store";

const EasypeasyProvider = ({ children }) => {
  return <StoreProvider store={store}>{children}</StoreProvider>;
};

export default EasypeasyProvider;
