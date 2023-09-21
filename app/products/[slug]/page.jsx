"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Wrapper from "@/app/components/wrapper/Wrapper";

const ProductPage = ({ params }) => {
  const slug = params.slug;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const fetchData = await axios.get(
          `http://127.0.0.1:1337/api/products?populate=*&filters[slug][$eq]=${slug}`
        );
        setProduct(fetchData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchFunction();
  }, [slug]);

  return (
    <Wrapper>
      <div className="mt-28 text-white">
        {product?.data ? (
          <>
            <h1>Product is - {product?.data?.data?.[0]?.attributes?.name}</h1>
            <p class="my-5 p-5 bg-orange-600">
              Description: {product?.data?.data?.[0]?.attributes?.description}
            </p>{" "}
            <p>
              Price: ${product?.data?.data?.[0]?.attributes?.original_price}
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Wrapper>
  );
};

export default ProductPage;
