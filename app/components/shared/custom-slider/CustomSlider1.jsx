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
import Button from "../../UI/button/Button";
import Wrapper from "../../Wrapper";

// External Data Import
const url = "http://127.0.0.1:1337/api/products/hot-discount?populate=*";

const CustomSlider1 = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProductsFromBackend = async () => {
    try {
      const fetchData = await axios.get(url);
      const products = fetchData.data;
      setProducts(products);
      setIsLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    getProductsFromBackend();
  }, []);

  // Create individual hover states for each product
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <Wrapper className="mt-10">
      {isLoading ? (
        // Show loading indicator while data is being fetched
        <p>Loading...</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={3}
          spaceBetween={15}
          breakpoints={{
            480: { slidesPerView: 1 },
            780: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
        >
          {products?.filteredData &&
            products?.filteredData.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  class="w-fit rounded overflow-hidden shadow-lg shadow-gray-900 relative border border-gray-700 m-2"
                  onMouseEnter={() => setHoveredProduct(item.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <Image
                    src={item.attributes.thumbnail.data.attributes.url}
                    width={350}
                    height={350}
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
      )}
    </Wrapper>
  );
};

export default CustomSlider1;
