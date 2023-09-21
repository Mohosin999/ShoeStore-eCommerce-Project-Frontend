"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Wrapper from "@/app/components/wrapper/Wrapper";

// Swiper related
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

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
      <div class="mt-24 flex flex-wrap">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={1}
          spaceBetween={15}
          breakpoints={{
            320: { slidesPerView: 1 }, // Smallest screens (e.g., mobile phones)
            640: { slidesPerView: 1 }, // Larger phones and small tablets
            768: { slidesPerView: 2 }, // Tablets
            1024: { slidesPerView: 3, spaceBetween: 20 }, // Small desktop screens
            1280: { slidesPerView: 3, spaceBetween: 20 }, // Standard desktop screens
            1920: { slidesPerView: 4, spaceBetween: 20 }, // Large screens (e.g., 4k displays)
          }}
        >
          <div class="flex w-2/3">
            <SwiperSlide>
              <div class="bg-green-800 w-1/3">
                <Image
                  src={commonUrl?.images?.data?.[0]?.attributes?.url}
                  width={500}
                  height={500}
                  class="w-10 h-10"
                />
              </div>
            </SwiperSlide>

            {/* <SwiperSlide> */}
            <div class="bg-purple-800 w-2/3">
              <h2 class="text-white">Feature Image</h2>
            </div>
            {/* </SwiperSlide> */}
          </div>
        </Swiper>

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
