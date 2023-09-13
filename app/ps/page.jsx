"use client";
3;
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Image from public directory
import Shoes from "../../public/shoe.jpg";
import Shoes2 from "../../public/img2.jpg";
import Shoes3 from "../../public/shoe.jpg";
import Shoes4 from "../../public/img2.jpg";

const CarouselComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [Shoes, Shoes2, Shoes3, Shoes4]; // Add more images as needed

  // This hook is for moving the slide automatically - start
  useEffect(() => {
    const interval = setInterval(() => {
      // Automatically move to the next slide
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images]);
  // This hook is for moving the slide automatically - end

  // These functions are to maintain the slides properly - start
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 3) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 3 : prevSlide - 3
    );
  };
  // These functions are to maintain the slides properly - end

  return (
    <div
      className="relative overflow-hidden w-full bg-white ml-auto mt-[8rem]"
      data-carousel="slide"
    >
      {/* This portion is for the images of the slide - start */}
      <div className="relative h-56 marker:rounded-lg md:h-96">
        {images.slice(currentSlide, currentSlide + 3).map((image, index) => (
          <div
            key={index}
            className={`w-1/3 duration-700 ease-in-out ${
              index === 0 ? "" : "hidden"
            }`}
            data-carousel-item
          >
            <Image
              src={image}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white"
              alt={`Slide ${currentSlide + index + 1}`}
            />
          </div>
        ))}
      </div>
      {/* This portion is for the images of the slide - end */}

      {/* This portion is for the dot button of the image position - start */}
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index >= currentSlide && index < currentSlide + 3
                ? "bg-blue-700"
                : "border border-gray-700"
            }`}
            aria-current={
              index >= currentSlide && index < currentSlide + 3
                ? "true"
                : "false"
            }
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>
      {/* This portion is for the dot button of the image position - end */}

      {/* This portion is for the previous button of the slide - start */}
      <button
        type="button"
        className="absolute top-[18.5rem] left-[18rem] z-30 flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 hover:bg-gray-700 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
        data-carousel-prev
      >
        <svg
          className="w-4 h-4 text-white dark:text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span className="sr-only bg-orange-500">Previous</span>
      </button>
      {/* This portion is for the previous button of the slide - end */}

      {/* This portion is for the next button of the slide - start */}
      <button
        type="button"
        className="absolute top-[16rem] left-[20rem] z-30 flex items-center justify-center w-10 h-10 rounded-full bg-green-700 hover:bg-gray-700 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
        data-carousel-next
      >
        <svg
          className="w-4 h-4 text-white dark:text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span className="sr-only">Next</span>
      </button>
      {/* This portion is for the next button of the slide - end */}
    </div>
  );
};

export default CarouselComponent;
