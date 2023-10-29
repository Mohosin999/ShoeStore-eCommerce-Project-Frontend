"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Wrapper from "../components/wrapper";
import { getEmailFromLocalCookie, getUserFromLocalCookie } from "../lib/auth";

const CheckOut = () => {
  const [userDetails, setUserDetails] = useState({
    username: null,
    email: null,
    about: null,
    user_status: null,
    userId: null,
  });
  const [editUserInfo, setEditUserInfo] = useState(false);

  const user = getUserFromLocalCookie();
  const emailFromCookies = getEmailFromLocalCookie();
  // console.log("user data -> ", userData?.data[0]?.attributes?.email);
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

  // useEffect(() => {
  //   const getOrderInfo = async () => {
  //     try {
  //       const user = await axios.get("http://127.0.0.1:1337/api/orders", {
  //         headers: {
  //           Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEAREER_TOKEN}`,
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       const userInfo = await user.data;

  //       if (userInfo) {
  //         setUserOrderInfo(userInfo);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getOrderInfo();
  // }, []);

  return (
    <Wrapper>
      <div className="mt-32">
        <h2 className="text-gray-200 text-4xl text-center font-bold">
          Dashboard
        </h2>

        <div className="flex items-center justify-start mt-6">
          <section className="w-1/2">
            <h2 className="text-2xl text-center font-medium text-green-600">
              Profile Information
            </h2>
            <div>
              {/* User name */}
              <div className="flex flex-col mt-3">
                <label className="text-base text-gray-200 mb-1">
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
                <label className="text-base text-gray-200 mb-1">
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
                <label className="text-base text-gray-200 mb-1">
                  You can change your about.
                </label>
                <textarea
                  name="about"
                  cols="30"
                  rows="10"
                  value={userDetails.about}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      [e.target.name]: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <button onClick={handleUserUpdate}>Save Changes</button>
            </div>
          </section>

          <section className="w-1/2">
            <h2 className=" text-2xl text-center font-medium text-green-600">
              Other Details
            </h2>

            {/* {userData?.data?.map((user) => (
              <div key={user.id}>
                {user.attributes.email === emailFromCookies && (
                  <h3>Grand Total: {user.attributes.grand_total}</h3>
                )}
              </div>
            ))} */}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

export default CheckOut;
