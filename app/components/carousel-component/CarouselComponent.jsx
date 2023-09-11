"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// Image from public directory
import Shoes from "../../../public/shoe.jpg";
import Shoes2 from "../../../public/img2.jpg";
import Shoes3 from "../../../public/shoe.jpg";
import Shoes4 from "../../../public/img2.jpg";

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [Shoes, Shoes2, Shoes3, Shoes4]; // Add more images as needed

  useEffect(() => {
    const interval = setInterval(() => {
      // Automatically move to the next slide
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images]);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  return (
    <div
      class="relative overflow-hidden w-96 h-96 rounded-full bg-white ml-auto top-[-18rem] right-[6rem] "
      data-carousel="slide"
    >
      <div class="relative h-56 marker:rounded-lg md:h-96">
        {/* Map all images to show image - start */}
        {images.map((image, index) => (
          <div
            key={index}
            class={`duration-700 ease-in-out ${
              index === currentSlide ? "" : "hidden"
            }`}
            data-carousel-item
          >
            <Image
              src={image}
              class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
        {/* Map all images to show image - end */}
      </div>
      <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {/* Map all images to show dot button below image - start */}
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            class={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-blue-700" : "border border-gray-700"
            }`}
            aria-current={index === currentSlide ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
            data-carousel-slide-to={index}
          ></button>
        ))}
        {/* Map all images to show dot button below image - end */}
      </div>

      <button
        type="button"
        class="absolute top-[18.5rem] left-[18rem] z-30 flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 hover:bg-orange-500 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
        data-carousel-prev
      >
        <svg
          class="w-4 h-4 text-white dark:text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span class="sr-only bg-orange-500">Previous</span>
      </button>

      <button
        type="button"
        class="absolute top-[16rem] left-[20rem] z-30 flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 hover:bg-orange-500 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
        data-carousel-next
      >
        <svg
          class="w-4 h-4 text-white dark:text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span class="sr-only">Next</span>
      </button>
    </div>
  );
};

export default CarouselComponent;
