"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStoreState } from "easy-peasy";
import { getUserFromLocalCookie } from "../lib/auth";
import Wrapper from "../components/wrapper";
import Image from "next/image";

const CheckOut = () => {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [data, setData] = useState({
    full_name: null,
    email: null,
    upazila: null,
    zila: "",
    zip_code: null,
    country: null,
  });

  console.log(data.country);

  // Handle register function for handling register activities
  const handleCheckout = async () => {
    try {
      const checkoutInfo = {
        data: {
          full_name: data.full_name,
          email: data.email,
          upazila: data.upazila,
          zila: data.zila,
          zip_code: data.zip_code,
          country: data.country,
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
      console.log("checkoutResponse", checkoutResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <section className="mt-14 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-8">
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

              {/* Email */}
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-base text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@test.com"
                    value={data.email}
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

{
  /* <section className="w-1/3 text-gray-100 mt-32">
<h2>Customer Username: {customerName}</h2>
<p>Customer has ordered {items.length} products.</p>

{/* Product image and title - start */
}
{
  /* <div className="grid grid-cols-1 gap-4 mt-4">
  {items.map((item) => (
    <div key={item.id} className="bg-gray-800 rounded-lg">
      {/* <div className="w-16 h-16 mr-4"> */
}
//   <div className="py-4 px-4 flex items-center justify-start">
//     <Image
//       width={200}
//       height={200}
//       src={item?.attributes?.thumbnail?.data?.attributes?.url}
//       alt="product-image"
//       className="w-16 h-auto pr-4"
//     />
//     {item.attributes.name}
//   </div>
// </div>
// ))}
// </div>
{
  /* Product image and title - start */
}

{
  /* <p className="mt-4">Total Price - ${grandTotal.toFixed(2)}</p> */
}
// </section>
