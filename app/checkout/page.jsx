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

  const router = useRouter(); // Router

  // Get items and action from  store (easy-peasy).
  const { items } = useStoreState((state) => state.cartPortion);
  const { clearAllCart, addRecentOrderId } = useStoreActions(
    (actions) => actions.cartPortion
  );

  // Get username and email from local cookies.
  const username = getUserFromLocalCookie();
  const email = getEmailFromLocalCookie();

  // Define the calculateGrandTotal function, but don't call it here.
  const grandTotal = useMemo(() => {
    return items.reduce((total, val) => total + val.price, 0);
  }, [items]);

  /**
   * Function to handle checkout functionalities.
   * After create an order, update the targeted product's quantity (increase).
   */
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

      // Create the order
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

      if (checkoutResponse) {
        // Add recent order id
        addRecentOrderId(checkoutResponse.data?.id);

        // Fetch the recently created order (or you can use the order ID from checkoutResponse)
        const userOrder = await axios.get(
          `http://127.0.0.1:1337/api/orders/${checkoutResponse.data?.id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEAREER_TOKEN}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const orderInfo = await userOrder.data;

        // Now, for each product in the order, you can decrease the quantity in Strapi.
        // orderInfo?.data?.attributes?.products - means products array from orderInfo.
        for (const product of orderInfo?.data?.attributes?.products) {
          const productId = product.id;
          const productQuantity = product.quantity;

          // Calculate the new available quantity
          const updatedAvailableProduct =
            product.attributes.available_product - productQuantity;

          // Create the request body with the 'data' key
          const requestBody = {
            data: {
              available_product: updatedAvailableProduct, // Update the available quantity
            },
          };

          // Send a request to update the product quantity in Strapi
          await axios.put(
            `http://127.0.0.1:1337/api/products/${productId}`,
            requestBody, // Use the updated request body
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
      <div className="mt-32 min-h-screen body-font relative">
        {/* Page title */}
        <div className="flex flex-col text-center w-full mb-6">
          <h1 className="text-4xl font-medium title-font mb-4 text-gray-200">
            Checkout Page
          </h1>
        </div>

        {/* Table to take user informations - start */}
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
                  <option value="Bangladesh">Mymensingh</option>
                  <option value="India">Dhaka</option>
                  <option value="Pakistan">Khulna</option>
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
        {/* Table to take user informations - end */}
      </div>
    </Wrapper>
  );
};

export default CheckOut;
