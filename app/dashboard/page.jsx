"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStoreState } from "easy-peasy";
// Functions
import { getEmailFromLocalCookie } from "../lib/auth";
import { fetchedDataFromBackend, getPrice } from "../lib/utils";
// Components
import Wrapper from "../components/wrapper";
import Button from "../components/UI/button";
import LoadingSpinner from "../components/loading-spinner";

/**
 * Dashboard page
 * @returns {JSX.Element}
 */
const Dashboard = () => {
  const [userDetails, setUserDetails] = useState({
    username: null,
    email: null,
    about: null,
    user_status: null,
    userId: null,
  });
  const [userOrderInfo, setUserOrderInfo] = useState(null);
  const [userRecentOrderInfo, setUserRecentOrderInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get recent order id from store.
  const { recentOrderId } = useStoreState((state) => state.cartPortion);
  // get email from cookies.
  const emailFromCookies = getEmailFromLocalCookie();
  const router = useRouter(); // Router

  // Hook for get user.
  useEffect(() => {
    // Asynchronous function for get user.
    const getUser = async () => {
      try {
        const user = await axios.get("http://127.0.0.1:1337/api/users", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEAREER_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const userInfo = await user.data;

        if (userInfo) {
          // Iterate through userInfo and set user details
          userInfo.forEach((user) => {
            if (user.email === emailFromCookies) {
              setUserDetails({
                username: user.username,
                email: user.email,
                about: user.about || null,
                user_status: user.status || "New",
                userId: user.id,
              });
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  // Handler function for update user's information.
  const handleUserUpdate = async () => {
    try {
      const userUpdate = {
        username: userDetails.username,
        email: userDetails.email,
        about: userDetails.about,
      };

      // Update the user info according to user id
      const user = await axios.put(
        `http://127.0.0.1:1337/api/users/${userDetails.userId}`,
        userUpdate,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEAREER_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const userInfo = await user.data;

      if (userInfo) {
        // After updating the user info, refresh the page.
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Hook for get user's order and it's information.
  useEffect(() => {
    const orderInfoUrl = "http://127.0.0.1:1337/api/orders";
    fetchedDataFromBackend(orderInfoUrl, setUserOrderInfo);
  }, []);

  // Hook for get user's recent order and it's information.
  useEffect(() => {
    const recentOrderInfoUrl = `http://127.0.0.1:1337/api/orders/${recentOrderId}`; // url
    fetchedDataFromBackend(recentOrderInfoUrl, setUserRecentOrderInfo); // Function
  }, []);

  // Hook for change 'isLoading' state's value (boolean) based on data.
  useEffect(() => {
    // Check if data is empty (or null, or undefined) and set isLoading accordingly
    if (
      !userDetails ||
      !userOrderInfo ||
      Object.keys(userDetails).length === 0 ||
      Object.keys(userOrderInfo).length === 0
    ) {
      setIsLoading(true); // Set to true when data is empty
    } else {
      setIsLoading(false); // Set to false when data is not empty
    }
  }, [userDetails, userOrderInfo]);

  return (
    <Wrapper>
      {isLoading ? (
        <div className="mt-32">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="mt-[6.5rem] lg:mt-32">
          {/* Page title */}
          <h2 className="text-gray-200 text-2xl md:text-3xl lg:text-4xl mb-4 lg:mb-6 text-center font-bold">
            Dashboard
          </h2>

          <div className="flex flex-col lg:flex-row">
            {/*
             * ==========================================================================
             * Left side of dashboard.
             * ==========================================================================
             */}
            <section className="w-full lg:w-1/2 mb-6 lg:mb-0">
              <h2 className="text-xl lg:text-2xl text-center font-medium text-green-600">
                Profile Information
              </h2>
              <div>
                {/* User name - start */}
                <div className="flex flex-col mt-3">
                  <label className="text-base lg:text-lg text-gray-200 mb-1">
                    You can change your name.
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={userDetails.username}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="w-full py-1 lg:py-2 px-4 text-sm lg:text-base"
                  />
                </div>
                {/* User name - end */}

                {/* User email - start */}
                <div className="flex flex-col mt-3">
                  <label className="text-base lg:text-lg text-gray-200 mb-1">
                    You can change your email.
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="w-full py-1 lg:py-2 px-4 text-sm lg:text-base"
                  />
                </div>
                {/* User email - end */}

                {/* User about - start */}
                <div className="flex flex-col mt-3">
                  <label className="text-base lg:text-lg text-gray-200 mb-1">
                    You can change your about.
                  </label>
                  <textarea
                    name="about"
                    value={userDetails.about}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="resize-none w-full h-48 py-1 lg:py-2 px-4 text-sm lg:text-base"
                  ></textarea>
                </div>
                {/* User about - end */}

                {/* Button for save all changes. */}
                <div className="mt-6">
                  <Button
                    href=""
                    onClick={handleUserUpdate}
                    label="Save Changes"
                  />
                </div>
              </div>
            </section>

            {/*
             * ==========================================================================
             * Right side of dashboard.
             * ==========================================================================
             */}
            <section className="w-full lg:w-1/2">
              <h2 className="text-xl lg:text-2xl text-center font-medium text-green-600">
                Other Details
              </h2>

              <div className="mt-4 lg:ml-20 text-base lg:text-lg text-gray-200 text-start">
                {/* paragraph for show how much time the user bought from here. */}
                <p className="mb-1">
                  You have ordered{" "}
                  <span className="text-xl lg:text-2xl text-green-600 mx-2">
                    {
                      userOrderInfo?.data?.filter(
                        (user) => user.attributes.email === emailFromCookies
                      ).length
                    }
                  </span>{" "}
                  times so far.
                </p>

                {/* paragraph for show how much dollor do I purchased so far. */}
                <p>
                  You have purchased items worth
                  <span className="text-xl lg:text-2xl text-green-600 mx-2">
                    {userOrderInfo?.data
                      ?.filter(
                        (user) => user.attributes.email === emailFromCookies
                      )
                      .reduce(
                        (total, user) => total + user.attributes.grand_total,
                        0
                      )
                      .toFixed(2)}
                    $
                  </span>{" "}
                  so far.
                </p>

                {/*
                 * ===============================
                 * User recent order related info.
                 * ===============================
                 */}
                <h2 className="text-gray-200 bg-green-600 my-4 py-1 px-2 inline-block">
                  Recent Order Related
                </h2>
                {/* If there is recent order, only when show the following section. */}
                {userRecentOrderInfo ? (
                  <div>
                    {/* User status (pending, done or cancelled) */}
                    <p>
                      {userRecentOrderInfo && (
                        <span>
                          Status: {userRecentOrderInfo.data.attributes.status}
                        </span>
                      )}
                    </p>

                    {/* Recent order total price. */}
                    <p>
                      Your recent order price is:{" "}
                      <span className="text-xl text-green-600 mx-1">
                        {userRecentOrderInfo?.data?.attributes?.grand_total
                          ? userRecentOrderInfo?.data?.attributes?.grand_total
                          : 0}
                        $
                      </span>
                    </p>

                    {/* Recently how much product I ordered. */}
                    <p>
                      Recently you ordered{" "}
                      <span className="text-xl text-green-600 mx-1">
                        {userRecentOrderInfo?.data?.attributes?.products.length}
                      </span>{" "}
                      {userRecentOrderInfo?.data?.attributes?.products.length >
                      1
                        ? "products"
                        : "product"}
                    </p>

                    {/* Information of product that I ordered. */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4 mt-6">
                      {userRecentOrderInfo?.data?.attributes?.products?.map(
                        (item) => (
                          <div
                            key={item.id}
                            className="bg-gray-600 p-4 rounded-lg shadow-md"
                          >
                            {/* Image and product name. - start */}
                            <div className="flex items-center justify-center">
                              <Image
                                src={
                                  item?.attributes?.thumbnail?.data?.attributes
                                    ?.url
                                }
                                width={200}
                                height={200}
                                alt="shoe"
                                className="w-12 h-auto"
                              />
                              {/* Product's name */}
                              <p className="text-lg font-semibold ml-3">
                                {item?.attributes?.name}
                              </p>
                            </div>
                            {/* Image and product name. - end */}

                            <div className="flex items-center justify-between mt-4">
                              {/* Product actual price */}
                              <p className="text-sm">
                                Price:
                                <span className="ml-1 bg-green-600 py-1 px-2 rounded-full">
                                  {getPrice(
                                    item?.attributes?.discounted_price,
                                    item?.attributes?.original_price
                                  )}
                                </span>
                              </p>

                              {/* Product quantity */}
                              <p className="text-sm">
                                Quantity:{" "}
                                <span className="ml-1 bg-green-600 py-1 px-2 rounded-full">
                                  {item?.quantity}
                                </span>
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-2xl lg:text-3xl text-red-500 text-center">
                    No Recent Order is Present🙂
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Dashboard;
