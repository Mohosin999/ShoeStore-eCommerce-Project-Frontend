"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Wrapper from "../components/wrapper";

const CheckOut = () => {
  const [userData, setUserData] = useState(null);
  console.log("user data -> ", userData);
  console.log("user data -> ", userData?.data[0]?.attributes?.email);
  // const router = useRouter();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await axios.get("http://127.0.0.1:1337/api/orders", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEAREER_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const userInfo = await user.data;

        if (userInfo) {
          setUserData(userInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo();
  }, []);

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
            {userData?.data?.map((user) => (
              <div key={user.id}>
                <h3>Full Name: {user.attributes.full_name}</h3>
              </div>
            ))}
          </section>

          <section className="w-1/2">
            <h2 className=" text-2xl text-center font-medium text-green-600">
              Other Details
            </h2>
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

export default CheckOut;
