"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStoreState } from "easy-peasy";
import { getUserFromLocalCookie } from "../lib/auth";
import Wrapper from "../components/wrapper";
import Image from "next/image";

const CheckOut = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [grandTotal, setGrandTotal] = useState(0);

  const { items } = useStoreState((state) => state.cartPortion);
  const customerName = getUserFromLocalCookie();

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

  // Handle register function for handling register activities
  const handleCheckout = async () => {
    try {
      const checkoutInfo = {
        data: {
          username: username,
          email: email,
        },
      };

      const checkout = await axios.post(
        "http://127.0.0.1:1337/api/orders",
        checkoutInfo,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const checkoutResponse = await checkout.data;
      console.log("Hello response -> ", checkoutResponse);

      // if (registerResponse) {
      //   // setToken for saving data in Cookies.
      //   setToken(registerResponse);
      //   // After saving data in Cookies, direct push in dashboard.
      //   router.push("/dashboard");
      // }
    } catch (error) {
      // alert(error.message);
      // setError(error.response.data.error.message);
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-wrap items-center justify-center">
        <section className="w-2/3 mt-14 body-font relative">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-200">
                Checkout Page
              </h1>
              <p className="text-gray-300 lg:w-2/3 mx-auto leading-relaxed text-base">
                Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
                gentrify.
              </p>
            </div>

            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-300"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>

                {/* <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="address"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div> */}
                <div className="p-2 w-full">
                  <button
                    onClick={handleCheckout}
                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-1/3 text-gray-100 mt-32">
          <h2>Customer Username: {customerName}</h2>
          <p>Customer has ordered {items.length} products.</p>

          {/* Product image and title - start */}
          <div className="grid grid-cols-1 gap-4 mt-4">
            {items.map((item) => (
              <div key={item.id} className="bg-gray-800 rounded-lg">
                {/* <div className="w-16 h-16 mr-4"> */}
                <div className="py-4 px-4 flex items-center justify-start">
                  <Image
                    width={200}
                    height={200}
                    src={item?.attributes?.thumbnail?.data?.attributes?.url}
                    alt="product-image"
                    className="w-16 h-auto pr-4"
                  />
                  {item.attributes.name}
                </div>
              </div>
            ))}
          </div>
          {/* Product image and title - start */}

          <p className="mt-4">Total Price - ${grandTotal.toFixed(2)}</p>
        </section>
      </div>
    </Wrapper>
  );
};

export default CheckOut;
