"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStoreState, useStoreActions } from "easy-peasy";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
// Empty box image
import emptyBox from "../../public/emptyBox.jpg";
// Function
import { getJwtFromLocalCookie } from "../lib/auth";
import { getPrice } from "../lib/utils";
// Components
import Wrapper from "../components/wrapper";
import ButtonLink from "../components/UI/button";
import ConfirmationPopup from "../components/confirmation-popup";
import Button from "../components/UI/button";

/**
 * Cart page
 * @returns {JSX.Element}
 */
const CartPage = () => {
  const [actualDeleteItem, setActualDeleteItem] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showClearAllPopup, setShowClearAllPopup] = useState(false);

  // Take necessary information from store (easy-peasy).
  const { items } = useStoreState((state) => state.cartPortion);
  const { updateCart, removeCart, clearAllCart } = useStoreActions(
    (actions) => actions.cartPortion
  );

  // Define the calculateGrandTotal function, but don't call it here.
  const grandTotal = useMemo(() => {
    return items.reduce((total, val) => total + val.price, 0);
  }, [items]);

  // Get token from local cookies.
  const token = getJwtFromLocalCookie();

  // Function to increment item quantity.
  const handleIncrement = (item) => {
    /**
     * If item's quantity and available product's number is equal or equal to 0 -
     * show error toast message.
     */
    if (
      item.quantity === item.attributes.available_product ||
      item.attributes.available_product === 0
    ) {
      toast.error("Sorry! no more product available", {
        hideProgressBar: true,
        autoClose: 3000,
        position: "bottom-left",
      });
    } else {
      updateCart({
        id: item.id,
        quantity: item.quantity + 1,
      });
    }
  };

  // Function to decrement item quantity.
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Check if quantity is greater than 0 before decrementing
      updateCart({
        id: item.id,
        quantity: item.quantity - 1,
      });
    }
  };

  return (
    <Wrapper>
      <div className="relative mt-32 min-h-screen text-center">
        {items.length > 0 && (
          <>
            {/* Page title */}
            <h1 className="text-gray-100 text-4xl font-bold mb-12">
              Shopping Cart
            </h1>

            {/* Table of items - start */}
            <div className="text-gray-100 w-4/5 mx-auto">
              <table className="w-full text-center mt-6">
                <thead>
                  <tr className="text-2xl text-green-500">
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {items?.map((item) => (
                    <tr
                      key={item.id}
                      className="text-lg shadow-sm shadow-gray-700"
                    >
                      <td className="py-4 pl-6 flex items-center justify-start">
                        {/* Item image */}
                        <Image
                          width={200}
                          height={200}
                          src={
                            item?.attributes?.thumbnail?.data?.attributes?.url
                          }
                          alt="product-image"
                          className="w-16 h-auto pr-4"
                        />
                        {/* Item title or name */}
                        {item.attributes.name}
                      </td>
                      <td className=" py-4">{item.quantity}</td>{" "}
                      {/* Item quantity */}
                      {/* Item price */}
                      <td className=" py-4">
                        {/* getPrice function to get item's price. */}
                        {getPrice(
                          item.attributes.discounted_price,
                          item.attributes.original_price
                        )}
                      </td>
                      <td className=" py-4">{item.price.toFixed(1)}</td>
                      {/* Buttons for quantity handle - start */}
                      <td className=" py-4">
                        {/* Decrease quantity button - start */}
                        <button
                          title={
                            item.quantity === 1
                              ? "Minimum number of products"
                              : "Decrease the product quantity"
                          }
                          onClick={() => handleDecrement(item)}
                          disabled={item.quantity === 1}
                          className={`px-3 mr-2 text-lg rounded-md ${
                            item.quantity === 1
                              ? "bg-gray-400"
                              : "bg-green-600 hover:scale-105 active:scale-100"
                          }`}
                        >
                          -
                        </button>
                        {/* Decrease quantity button - end */}

                        {/* Increase quantity button - start */}
                        <button
                          title={
                            item.quantity === item.attributes.available_product
                              ? "No more product exist!"
                              : "Increase the product quantity"
                          }
                          onClick={() => handleIncrement(item)}
                          className="px-3 mr-2 text-lg rounded-md bg-green-600 hover:scale-105 active:scale-100"
                        >
                          +
                        </button>
                        {/* Increase quantity button - end */}
                      </td>
                      {/* Buttons for quantity handle - end */}
                      <td className="py-4">
                        {/* Button for deleting product - start */}
                        <button
                          onClick={() => {
                            setShowDeletePopup(true);
                            setActualDeleteItem(item);
                          }}
                          title="Delete the product"
                        >
                          <RiDeleteBack2Fill />
                        </button>
                        {/* If state is true, show the confirmation dialog to delete. */}
                        {showDeletePopup && (
                          <ConfirmationPopup
                            item={actualDeleteItem}
                            removeAction={removeCart}
                            setShowPopup={setShowDeletePopup}
                          />
                        )}
                        {/* Button for deleting product - end */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Table of items - end */}

            {/* Grand total, clear all and checkout button's portion - start */}
            <div className="w-full mt-8">
              {/* Grand Total Display */}
              <div className="mr-32 text-gray-100 text-2xl font-bold my-6 flex items-center justify-end">
                Grand Total:{" "}
                <span className="text-green-400 ml-8">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              {/* Clear all product button - start */}
              <button
                onClick={() => setShowClearAllPopup(true)}
                title="Clear all products"
                className="bg-green-600 hover:bg-green-700 text-gray-200 px-6 py-2.5 rounded-full mb-6"
              >
                Clear All
              </button>
              {/* If state is true, show the confirmation dialog to delete. */}
              {showClearAllPopup && (
                <ConfirmationPopup
                  removeAction={clearAllCart}
                  setShowPopup={setShowClearAllPopup}
                />
              )}
              {/* Clear all product button - end */}

              {/* Checkout button */}
              <Button
                /**
                 * If authenticated user, then go to checkout page.
                 * Otherwise, go to login page.
                 */
                href={token ? "/checkout" : "/login"}
                label="Checkout"
              />
            </div>
            {/* Grand total, clear all and checkout button's portion - end */}
          </>
        )}

        {/*
         * ======================================================
         * This is empty screen
         * ======================================================
         */}
        {items.length < 1 && (
          <div className="flex flex-col items-center justify-center my-16">
            <h1 className="text-4xl text-gray-100 font-bold">
              Empty Cartlist 😞
            </h1>
            <Image
              src={emptyBox}
              alt="empty-box"
              className="w-96 h-auto my-10"
            />

            <Button href="/products" label="Continue Shopping" />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default CartPage;
