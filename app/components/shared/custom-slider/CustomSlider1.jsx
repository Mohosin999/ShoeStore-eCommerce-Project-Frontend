"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import NavSlideBtn from "./SlideNavButton";

// External Data Import
const url = "http://127.0.0.1:1337/api/products?populate=*";

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

  // const fetchData = await axios.get(url);
  // const products = fetchData.data;

  return (
    <div>
      <h1>Custom Slider 1</h1>
      <br />

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={15}
        breakpoints={{
          480: { slidesPerView: 2 },
          780: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {products?.data &&
          products?.data.map((item) => (
            <SwiperSlide
              key={item.id}
              className="bg-red-200 !flex justify-center items-center "
            >
              <div className="border-2 border-blue-500 rounded-lg overflow-hidden w-[200px] h-[300px] flex justify-center items-center">
                <Image
                  src={item.attributes.thumbnail.data.attributes.url}
                  width={150}
                  height={150}
                  alt={item.name}
                />
                <h3>{item.attributes.name}</h3>
              </div>
            </SwiperSlide>
          ))}

        <NavSlideBtn />
      </Swiper>
    </div>
  );
};

export default CustomSlider1;
