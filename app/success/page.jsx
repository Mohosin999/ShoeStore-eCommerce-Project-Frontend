"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ButtonLink from "../components/UI/button-link";

const SuccessPage = () => {
  const [products, setProducts] = useState(null);
  const [userOrderInfo, setUserOrderInfo] = useState(null);

  // console.log("products from success page -> ", products);
  // console.log("user order from success page -> ", userOrderInfo);

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

  // Hook for get products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await axios.get("http://127.0.0.1:1337/api/products", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEAREER_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const productsInfo = await products.data;

        if (productsInfo) {
          setProducts(productsInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl text-green-600 font-semibold mb-4">
          Payment Successful
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your purchase!
        </p>
        <ButtonLink href="/products" label="Continue Shopping..." />
      </div>
    </div>
  );
};

export default SuccessPage;
