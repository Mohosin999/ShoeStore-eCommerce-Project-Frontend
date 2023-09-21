"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Wrapper from "@/app/components/wrapper/Wrapper";
import ProductImagesSlider from "@/app/components/product-images-slider";

// Swiper related styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductPage = ({ params }) => {
  const slug = params.slug;
  const [product, setProduct] = useState(null);

  const commonUrl = product?.data?.data?.[0]?.attributes;

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
      <div class="mt-24">
        <div class="w-full">
          <ProductImagesSlider images={commonUrl?.images?.data} />
        </div>

        <div class="w-1/3 text-white">
          {product?.data ? (
            <>
              <h1>Product is - {commonUrl?.name}</h1>
              <p class="my-5 p-5 bg-orange-600">
                Description: {commonUrl?.description}
              </p>{" "}
              <p>Price: ${commonUrl?.slug}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductPage;
