"use client";
import React from "react";
import { StoreProvider } from "easy-peasy";
import store from "../store";

/**
 *
 * Easypeasy provider component
 *
 * I cound do it inside "layout.js", but I did it here to keep the code clear.
 */
const EasypeasyProvider = ({ children }) => {
  return <StoreProvider store={store}>{children}</StoreProvider>;
};

export default EasypeasyProvider;
