"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import NavSlideBtn from "./SlideNavButton";
import Button from "../../UI/button/Button";

// External Data Import
const url = "http://127.0.0.1:1337/api/products/hot-discount?populate=*";

const CustomSlider1 = () => {
  const [products, setProducts] = useState([]);

  const getProductsFromBackend = async () => {
    const fetchData = await axios.get(url);
    const products = fetchData.data;

    setProducts(products);
  };

  useEffect(() => {
    getProductsFromBackend();
  }, []);

  // Create individual hover states for each product
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <div class="mt-[5rem] px-10">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={15}
        breakpoints={{
          480: { slidesPerView: 2 },
          780: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
        }}
      >
        {products?.filteredData &&
          products?.filteredData.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                class="max-w-sm rounded overflow-hidden shadow-lg shadow-gray-800 relative border border-gray-700 m-2"
                onMouseEnter={() => setHoveredProduct(item.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Image
                  src={item.attributes.thumbnail.data.attributes.url}
                  width={400}
                  height={400}
                  alt={item.name}
                />

                <div class="bg-gray-800 p-4 text-center">
                  <h2 class="text-xl text-gray-200 font-semibold mb-2">
                    {item.attributes.name}
                  </h2>
                  <p class="text-lg text-red-400">
                    Original Price:{" "}
                    <span class="font-bold pl-3">
                      ${item.attributes.original_price}
                    </span>
                  </p>
                  <p class="text-lg text-green-500">
                    Discounted Price:{" "}
                    <span class="font-bold pl-3">
                      ${item.attributes.discounted_price}
                    </span>
                  </p>
                </div>

                {hoveredProduct === item.id && (
                  <div class="absolute inset-0 flex flex-col justify-center items-center text-white text-center backdrop-blur-sm">
                    <div class="text-center">
                      <Button href="/" label="Buy Now" />
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        <NavSlideBtn />
      </Swiper>
    </div>
  );
};

export default CustomSlider1;
