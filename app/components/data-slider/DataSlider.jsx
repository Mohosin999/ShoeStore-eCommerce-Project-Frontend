"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
 * @param {string} apiUrl - The URL for fetching data from an external API.
 * @param {string} title - Give your desire title here.
 * @returns {JSX.Element} - Returns a component to display fetched data.
 */
const DataSlider = ({ apiUrl, title }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * fetchDataFromBackend is an asynchronous function that fetches data
   * from the specified API URL and updates the component's state.
   */
  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get(apiUrl);
      const fetchedData = response.data;
      setData(fetchedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts or when apiUrl changes.
    fetchDataFromBackend();
  }, [apiUrl]);

  return (
    <Wrapper className="mt-10">
      {isLoading ? (
        <p>Loading...</p>
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
            {(data?.filteredData || data?.data)?.map((item) => (
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
  apiUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default DataSlider;
