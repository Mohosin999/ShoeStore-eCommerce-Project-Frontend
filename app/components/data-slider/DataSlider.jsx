"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Swiper related
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Components
import Wrapper from "../wrapper/Wrapper";
import SlideNavButton from "./SlideNavButton";
import ProductCard from "../product-card/ProductCard";
import Title from "../UI/title/Title";

/**
 * A reusable component for fetching and displaying data in a Swiper carousel.
 *
 * @param {Object} data - Give here a data object.
 * @param {string} title - Give your desire title here.
 * @returns {JSX.Element} - Returns a component to display fetched data.
 */
const DataSlider = ({ data, title }) => {
  const [isLoading, setIsLoading] = useState(true); // Initially set to true

  useEffect(() => {
    // Check if data is empty (or null, or undefined) and set isLoading accordingly
    if (!data || Object.keys(data).length === 0) {
      setIsLoading(true); // Set to true when data is empty
    } else {
      setIsLoading(false); // Set to false when data is not empty
    }
  }, [data]); // Run this effect whenever 'data' prop changes

  return (
    <Wrapper className="mt-10">
      {isLoading ? (
        <p class="text-white text-3xl py-10 ">Loading...</p>
      ) : (
        <div>
          {/* Title component for the swiper carousel */}
          <Title title={title} />
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
            {(data?.data || data?.filteredData)?.map((item) => (
              <SwiperSlide key={item.id}>
                {/* Render each item as a SwiperSlide using the ProductCard component. */}
                <ProductCard item={item} />
              </SwiperSlide>
            ))}
            {/* Render navigation buttons for the Swiper carousel. */}
            <SlideNavButton />
          </Swiper>
        </div>
      )}
    </Wrapper>
  );
};

// Define PropTypes for the component
DataSlider.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default DataSlider;
