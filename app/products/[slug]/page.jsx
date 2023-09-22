"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
// Swiper related styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Components
import Wrapper from "@/app/components/wrapper/Wrapper";
import ProductImagesSlider from "@/app/components/product-images-slider";
import Title from "@/app/components/UI/title/Title";

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
      <div class="flex mt-24">
        <div class="w-2/4 px-10 py-4">
          <ProductImagesSlider images={commonUrl?.images?.data} />
        </div>

        <div class="w-2/4 px-10 py-4 text-white">
          {product?.data ? (
            <>
              <div>
                <Title title={commonUrl?.name} />
                {/* <h1>Product is - {commonUrl?.name}</h1> */}
              </div>
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
