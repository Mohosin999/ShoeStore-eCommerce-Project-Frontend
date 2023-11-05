"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStoreState, useStoreActions } from "easy-peasy";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
// Empty box image
import emptyBox from "../../public/emptyBox.jpg";
// Components
import Wrapper from "../components/wrapper";
import ButtonLink from "../components/UI/button";
// Function
import { getJwtFromLocalCookie } from "../lib/auth";
import ConfirmationPopup from "../components/confirmation-popup";

/**
 * Cart page
 * @returns {JSX.Element}
 */
const CartPage = () => {
  const [showPopup, setShowPopup] = useState(false);
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
        position: "bottom-right",
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
                        <Image
                          width={200}
                          height={200}
                          src={
                            item?.attributes?.thumbnail?.data?.attributes?.url
                          }
                          alt="product-image"
                          className="w-16 h-auto pr-4"
                        />
                        {item.attributes.name}
                      </td>
                      <td className=" py-4">{item.quantity}</td>
                      <td className=" py-4">
                        {item.attributes.discounted_price
                          ? item.attributes.discounted_price
                          : item.attributes.original_price}
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
                            item.quantity === 1 ? "bg-gray-400" : "bg-green-700"
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
                          className="px-3 mr-2 text-lg rounded-md bg-green-700"
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
                            const shouldDelete = window.confirm(
                              "Are you sure you want to delete the product?"
                            );
                            if (shouldDelete) {
                              removeCart(item);
                            }
                          }}
                          title="Delete the product"
                        >
                          <RiDeleteBack2Fill />
                        </button>
                        {/* Button for deleting product - end */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Table of items - end */}

            {/* Grand total, clear all and checkout button's portion - start */}
            <div className="mt-12">
              {/* Clear all product button */}
              <button
                onClick={() => {
                  const shouldClear = window.confirm(
                    "Are you sure you want to clear all products?"
                  );
                  if (shouldClear) {
                    clearAllCart();
                  }
                }}
                title="Clear all products"
                className="bg-green-600 hover:bg-green-700 text-gray-100 text-lg py-2 px-4 rounded-md"
              >
                Clear All
              </button>

              {/* Grand Total Display */}
              <div className="relative text-gray-100 text-2xl font-bold my-6 flex items-center justify-center">
                Grand Total:{" "}
                <span className="absolute ml-72 text-4xl text-yellow-400">
                  <span className="text-green-500">$</span>
                  {grandTotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout button */}
              <ButtonLink
                href={token ? "/checkout" : "/login"}
                label="Checkout"
              />
            </div>
            {/* Grand total, clear all and checkout button's portion - end */}
          </>
        )}

        {/* This is empty screen */}
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
            <Link
              href="/products"
              className="text-lg bg-green-600 hover:bg-green-700 py-2 px-6 rounded-md"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default CartPage;
