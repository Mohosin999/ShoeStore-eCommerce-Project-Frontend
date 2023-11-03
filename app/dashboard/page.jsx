"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStoreState } from "easy-peasy";
import Wrapper from "../components/wrapper";
import { getEmailFromLocalCookie, getUserFromLocalCookie } from "../lib/auth";
import Button from "../components/UI/button";

const CheckOut = () => {
  const [userDetails, setUserDetails] = useState({
    username: null,
    email: null,
    about: null,
    user_status: null,
    userId: null,
  });
  const [userOrderInfo, setUserOrderInfo] = useState(null);
  const [userRecentOrderInfo, setUserRecentOrderInfo] = useState(null);

  // Get recent order id.
  const { recentOrderId } = useStoreState((state) => state.cartPortion);

  const emailFromCookies = getEmailFromLocalCookie();
  const router = useRouter();

  // Hook for get user.
  useEffect(() => {
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
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Hook for get user's order and it's information.
  useEffect(() => {
    const getOrderInfo = async () => {
      try {
        const userOrder = await axios.get("http://127.0.0.1:1337/api/orders", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEAREER_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const orderInfo = await userOrder.data;

        if (orderInfo) {
          setUserOrderInfo(orderInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOrderInfo();
  }, []);

  // Hook for get user's recent order and it's information.
  useEffect(() => {
    const getRecentOrder = async () => {
      try {
        const recentOrder = await axios.get(
          `http://127.0.0.1:1337/api/orders/${recentOrderId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEAREER_TOKEN}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const recentOrderInfo = await recentOrder.data;

        if (recentOrderInfo) {
          setUserRecentOrderInfo(recentOrderInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRecentOrder();
  }, []);

  return (
    <Wrapper>
      <div className="mt-32">
        <h2 className="text-gray-200 text-4xl text-center font-bold">
          Dashboard
        </h2>

        <div className="flex">
          <section className="w-1/2">
            <h2 className="text-2xl text-center font-medium text-green-600">
              Profile Information
            </h2>
            <div>
              {/* User name */}
              <div className="flex flex-col mt-3">
                <label className="text-lg text-gray-200 mb-1">
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
                  className="w-full py-2 px-4"
                />
              </div>

              {/* User email */}
              <div className="flex flex-col mt-3">
                <label className="text-lg text-gray-200 mb-1">
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
                  className="w-full py-2 px-4"
                />
              </div>

              {/* User about */}
              <div className="flex flex-col mt-3">
                <label className="text-lg text-gray-200 mb-1">
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
                  className="resize-none w-full h-48 py-2 px-4"
                ></textarea>
              </div>

              <Button
                onClick={handleUserUpdate}
                label="Save Changes"
                className="mt-5"
              />
            </div>
          </section>

          <section className="w-1/2">
            <h2 className=" text-2xl text-center font-medium text-green-600">
              Other Details
            </h2>

            <div className="text-lg text-gray-200 text-center">
              <p className="mb-2">
                You ordered for{" "}
                <span className="text-2xl text-green-600 mx-2">
                  {
                    userOrderInfo?.data?.filter(
                      (user) => user.attributes.email === emailFromCookies
                    ).length
                  }
                </span>{" "}
                times.
              </p>

              <p>
                You bought products of
                <span className="text-2xl text-green-600 mx-2">
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
                </span>
              </p>

              {/* User recent order related info. */}
              <p>Status: {userRecentOrderInfo?.data?.attributes?.status}</p>
              <p>
                Your recent order price is:{" "}
                {userRecentOrderInfo?.data?.attributes?.grand_total}$
              </p>
              <p>
                Recently you ordered{" "}
                {userRecentOrderInfo?.data?.attributes?.products.length}{" "}
                {userRecentOrderInfo?.data?.attributes?.products.length > 1
                  ? "products"
                  : "product"}
              </p>

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
                            item?.attributes?.thumbnail?.data?.attributes?.url
                          }
                          width={200}
                          height={200}
                          alt="shoe"
                          className="w-12 h-auto"
                        />
                        <p className="text-xl font-semibold ml-3">
                          {item?.attributes?.name}
                        </p>
                      </div>
                      {/* Image and product name. - end */}

                      <p className="text-base">
                        {" "}
                        Price:
                        {item?.attributes?.discounted_price
                          ? `${item?.attributes?.discounted_price}$`
                          : `${item?.attributes?.original_price}$`}
                      </p>
                      <p className="text-gray-100 text-base">
                        Quantity: {item?.quantity}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

export default CheckOut;
