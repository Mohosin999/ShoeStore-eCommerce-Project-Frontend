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

  const handleClearAll = () => {
    setShowClearAllPopup(true);
  };

  return (
    <Wrapper>
      <div className="relative mt-[6.5rem] lg:mt-32 min-h-screen text-center">
        {items.length > 0 && (
          <>
            {/* Page title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-200 font-bold md:mb-8 lg:mb-12">
              Shopping Cart
            </h1>

            {/* Table of items - start */}
            <div className="text-gray-200 w-full py-3 lg:py-0 lg:w-4/5 mx-auto">
              <table className="w-full text-center mt-6">
                <thead>
                  <tr className="text-xs md:text-xl lg:text-2xl text-green-500">
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
                      <td className="py-2 lg:py-4 pl-1 md:pl-2 lg:pl-4 flex items-center justify-start">
                        {/* Item image */}
                        <Image
                          width={200}
                          height={200}
                          src={
                            item?.attributes?.thumbnail?.data?.attributes?.url
                          }
                          alt="product-image"
                          className="w-10 md:w-14 lg:w-16 h-auto pr-2 md:pr-4"
                        />
                        {/* Item title or name */}
                        <span className="text-xs md:text-lg lg:text-xl">
                          {item.attributes.name}
                        </span>
                      </td>
                      <td className="text-xs md:text-lg lg:text-xl py-2 lg:py-4">
                        {item.quantity}
                      </td>{" "}
                      {/* Item quantity */}
                      {/* Item price */}
                      <td className="text-xs md:text-lg lg:text-xl py-2 lg:py-4">
                        {/* getPrice function to get item's price. */}
                        {getPrice(
                          item.attributes.discounted_price,
                          item.attributes.original_price
                        )}
                      </td>
                      <td className="text-xs md:text-lg lg:text-xl py-2 lg:py-4">
                        {item.price.toFixed(1)}
                      </td>
                      {/* Buttons for quantity handle - start */}
                      <td className="md:py-2 lg:py-4">
                        {/* Decrease quantity button - start */}
                        <button
                          title={
                            item.quantity === 1
                              ? "Minimum number of products"
                              : "Decrease the product quantity"
                          }
                          onClick={() => handleDecrement(item)}
                          disabled={item.quantity === 1}
                          className={`px-1.5 md:px-2 lg:px-3 lg:py-1 mr-1 md:mr-2 text-xs md:text-base rounded-full md:rounded-md ${
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
                          className="px-1 md:px-2 lg:px-3 lg:py-1 mr-1 md:mr-2 text-xs md:text-base rounded-full md:rounded-md bg-green-600 hover:scale-105 active:scale-100"
                        >
                          +
                        </button>
                        {/* Increase quantity button - end */}
                      </td>
                      {/* Buttons for quantity handle - end */}
                      <td className="text-xs md:text-base lg:text-xl py-2 lg:py-4">
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
            <div className="w-full md:mt-3 lg:mt-8">
              {/* Grand Total Display */}
              <div className="mr-3 md:mr-6 lg:mr-32 text-gray-100 text-sm md:text-2xl font-bold my-1 mb-6 md:mb-8 lg:mb-10 md:my-4 lg:my-6 flex items-center justify-end">
                Grand Total:{" "}
                <span className="text-green-400 ml-4 md:ml-6 lg:ml-8">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              {/* Clear all product button - start */}
              <div className="mb-4 xl:mb-8">
                <Button href="" label="Clear All" onClick={handleClearAll} />
              </div>

              {/* If state is true, show the confirmation dialog to delete. */}
              {showClearAllPopup && (
                <ConfirmationPopup
                  removeAction={clearAllCart}
                  setShowPopup={setShowClearAllPopup}
                />
              )}
              {/* Clear all product button - end */}

              {/* Checkout button */}
              <div>
                <Button
                  /**
                   * If authenticated user, then go to checkout page.
                   * Otherwise, go to login page.
                   */
                  href={token ? "/checkout" : "/login"}
                  label="Checkout"
                />
              </div>
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-200 font-bold">
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
