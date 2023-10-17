"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useStoreState, useStoreActions } from "easy-peasy";
import { RiDeleteBack2Fill } from "react-icons/ri";
import Wrapper from "../components/wrapper";
import emptyBox from "../../public/emptyBox.jpg";

const CartPage = () => {
  const { items } = useStoreState((state) => state.cartPortion);
  const { updateCart, removeCart, clearAllCart } = useStoreActions(
    (actions) => actions.cartPortion
  );

  return (
    <Wrapper>
      <div className="mt-32 h-screen text-gray-200 text-center">
        {items.length === 0 ? (
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
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>
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
                      <td className="py-4 flex items-center justify-center">
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
                            item.quantity === 0
                              ? "No product exist"
                              : "Decrease the product quantity"
                          }
                          onClick={() =>
                            updateCart({
                              id: item.id,
                              quantity: item.quantity - 1,
                            })
                          }
                          disabled={item.quantity === 0}
                          className={`py-1 px-3 mr-2 text-lg rounded-md ${
                            item.quantity === 0 ? "bg-gray-400" : "bg-green-700"
                          }`}
                        >
                          -
                        </button>
                        {/* Decrease quantity button - end */}

                        {/* Increase quantity button - start */}
                        <button
                          title="Increase the product quantity"
                          onClick={() =>
                            updateCart({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          }
                          className="py-1 px-3 bg-green-700 text-lg rounded-md"
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

            <div>
              <button
                onClick={() => {
                  const isClearAll = window.confirm(
                    "Really you want to clear all products?"
                  );
                  if (isClearAll) {
                    clearAllCart();
                  }
                }}
              >
                Clear All
              </button>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default CartPage;
