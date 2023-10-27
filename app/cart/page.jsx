"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStoreState, useStoreActions } from "easy-peasy";
import { RiDeleteBack2Fill } from "react-icons/ri";
import Wrapper from "../components/wrapper";
import emptyBox from "../../public/emptyBox.jpg";
import ButtonLink from "../components/UI/button-link";
import { getJwtFromLocalCookie } from "../lib/auth";

const CartPage = () => {
  const { items } = useStoreState((state) => state.cartPortion);
  const { updateCart, removeCart, clearAllCart } = useStoreActions(
    (actions) => actions.cartPortion
  );

  const [isUnAvailable, setIsUnAvailable] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);

  const calculateGrandTotal = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    setGrandTotal(total);
  };

  useEffect(() => {
    calculateGrandTotal();
  }, [items]);
  // Define the calculateGrandTotal function, but don't call it here.
  // const grandTotal = useMemo(() => {
  //   return items.reduce((total, val) => total + val.price, 0);
  // }, [items]);
  // console.log("use memo", grandTotal);

  // Get token from local cookies.
  const token = getJwtFromLocalCookie();

  const handleIncrement = (item) => {
    if (item.quantity === item.attributes.available_product) {
      setIsUnAvailable(true);

      setTimeout(() => {
        setIsUnAvailable(false);
      }, 3000);
    } else {
      updateCart({
        id: item.id,
        quantity: item.quantity + 1,
      });
    }
  };

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
      <div className="relative mt-32 h-screen text-gray-200 text-center">
        {items.length > 0 && (
          <>
            <h1 className=" text-4xl font-bold mb-12">Shopping Cart</h1>

            <div className="w-4/5 mx-auto">
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

            {/* If product already added, show the following popup */}
            {isUnAvailable && (
              <div className="absolute bg-red-500 text-gray-100 text-lg py-2 px-4 text-center top-2 right-0 z-10">
                Sorry! no more product available
              </div>
            )}

            {/* Grand total, clear all and checkout button's portion - start */}
            <div className="mt-12">
              {/* Clear all product button */}
              <button
                onClick={() => {
                  const isClearAll = window.confirm(
                    "Really you want to clear all products?"
                  );
                  if (isClearAll) {
                    clearAllCart();
                  }
                }}
                className="bg-green-700 hover:bg-green-800 text-gray-100 text-lg py-2 px-4 rounded-md"
              >
                Clear All
              </button>

              {/* Grand Total Display */}
              <div className="relative text-2xl font-bold my-6 flex items-center justify-center">
                Grand Total:{" "}
                <span className="absolute ml-72 text-4xl text-yellow-400">
                  <span className="text-green-500">$</span>
                  {grandTotal.toFixed(2)}
                </span>
              </div>

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
            <h1 className="text-4xl font-bold">Empty Product</h1>
            <Image
              src={emptyBox}
              alt="empty-box"
              className="w-96 h-auto my-10"
            />
            <Link
              href="/products"
              className="text-lg bg-green-700 hover:bg-green-800 py-2 px-6 rounded-md"
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
