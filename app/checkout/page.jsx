"use client";
import React, { useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useStoreActions, useStoreState } from "easy-peasy";
import { getEmailFromLocalCookie, getUserFromLocalCookie } from "../lib/auth";
import Wrapper from "../components/wrapper";

const CheckOut = () => {
  const [data, setData] = useState({
    full_name: null,
    email: null,
    upazila: null,
    zila: null,
    zip_code: null,
    division: null,
    country: null,
  });

  const router = useRouter();

  // Get items and action from  store (easy-peasy).
  const { items } = useStoreState((state) => state.cartPortion);
  const { clearAllCart } = useStoreActions((actions) => actions.cartPortion);

  // Get user and email from local cookies.
  const username = getUserFromLocalCookie();
  const email = getEmailFromLocalCookie();

  // Define the calculateGrandTotal function, but don't call it here.
  const grandTotal = useMemo(() => {
    return items.reduce((total, val) => total + val.price, 0);
  }, [items]);

  // Handle register function for handling register activities
  const handleCheckout = async () => {
    try {
      const checkoutInfo = {
        data: {
          full_name: data.full_name,
          username: username,
          email: email,
          upazila: data.upazila,
          zila: data.zila,
          zip_code: data.zip_code,
          division: data.division,
          country: data.country,
          product_quantity: items.length,
          grand_total: grandTotal,
          products: items,
        },
      };

      const checkout = await axios.post(
        "http://127.0.0.1:1337/api/orders",
        checkoutInfo,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEAREER_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const checkoutResponse = await checkout.data;

      //  Access the order info.
      const userOrder = await axios.get("http://127.0.0.1:1337/api/orders", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEAREER_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const orderInfo = await userOrder.data;
      console.log("order info among from checkout", orderInfo);

      /**
       * If order created -
       * Clear all cart from cart page and
       * Go to products page.
       */
      // if (checkoutResponse) {
      //   clearAllCart();
      //   router.push("/success");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout2 = async () => {
    try {
      const checkoutInfo = {
        // ... (Your existing code to create the order)
      };

      // Create the order
      const checkout = await axios.post(
        "http://127.0.0.1:1337/api/orders",
        checkoutInfo,
        {
          // ... (Your headers and authentication)
        }
      );

      const checkoutResponse = await checkout.data;

      if (checkoutResponse) {
        // Fetch the recently created order (or you can use the order ID from checkoutResponse)
        const userOrder = await axios.get(
          `http://127.0.0.1:1337/api/orders/${checkoutResponse.id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEAREER_TOKEN}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const orderInfo = await userOrder.data;
        console.log("order info from checkout", orderInfo);

        // Now, for each product in the order, you can decrease the quantity in Strapi.
        for (const product of orderInfo.products) {
          // Assuming your product has a unique identifier like an ID
          const productId = product.id;
          const productQuantity = product.quantity; // You may need to adjust this based on your data structure

          // Send a request to update the product quantity in Strapi
          await axios.put(
            `http://127.0.0.1:1337/api/products/${productId}`,
            {
              quantity: productQuantity - 1, // Decrease the quantity by 1 (you can adjust as needed)
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEAREER_TOKEN}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
        }

        // Clear the cart and redirect to the success page
        clearAllCart();
        router.push("/success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <section className="mt-12 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-6">
            <h1 className="text-4xl font-medium title-font mb-4 text-gray-200">
              Checkout Page
            </h1>
          </div>

          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              {/* Full name */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="full_name"
                    className="leading-7 text-base text-gray-300"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    placeholder="Example Name"
                    value={data.full_name}
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* Upazila */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="upazila"
                    className="leading-7 text-base text-gray-300"
                  >
                    Upazila
                  </label>
                  <input
                    type="text"
                    id="upazila"
                    name="upazila"
                    placeholder="Example"
                    value={data.upazila}
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* Zila */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="zila"
                    className="leading-7 text-base text-gray-300"
                  >
                    Zila
                  </label>
                  <input
                    type="text"
                    id="zila"
                    name="zila"
                    placeholder="Example"
                    value={data.zila}
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* Zip Code */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="zip_code"
                    className="leading-7 text-base text-gray-300"
                  >
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zip_code"
                    name="zip_code"
                    placeholder="0000"
                    value={data.zip_code}
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* Division */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="division"
                    className="leading-7 text-base text-gray-300"
                  >
                    Division
                  </label>
                  <select
                    id="division"
                    name="division"
                    value={data.division}
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[0.6rem] px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option value="">Select</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="India">India</option>
                    <option value="Pakistan">Pakistan</option>
                    {/* Add more country options as needed */}
                  </select>
                </div>
              </div>

              {/* Country */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="country"
                    className="leading-7 text-base text-gray-300"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={data.country}
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[0.6rem] px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option value="">Select</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="India">India</option>
                    <option value="Pakistan">Pakistan</option>
                    {/* Add more country options as needed */}
                  </select>
                </div>
              </div>

              {/* <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="address"
                    className="leading-7 text-base text-gray-300"
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
              <div className="p-2 mt-4 w-full">
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
    </Wrapper>
  );
};

export default CheckOut;
