import React from "react";
import Button from "../UI/button";
import HeroAreaCarousel from "./HeroAreaCarousel";

/**
 * Hero area component.
 * @returns {JSX.Element}
 */
const HeroArea = () => {
  return (
    <header
      // This style is for full header-area body which is located below navbar
      className="bg-gray-700 w-full h-[22rem] mt-16 py-12 px-24"
    >
      <div>
        {/* The heading of the header area - start */}
        <div>
          <h1 className="text-gray-300 text-[2rem] text-left uppercase font-bold">
            All <span className="text-green-500">Branding</span>
          </h1>
          <h1 className="text-gray-200 text-[2rem] text-left uppercase font-bold">
            <span className="text-green-500">Shoes</span> Collection
          </h1>
        </div>

        {/* The paragraph of the header area */}
        <p className="text-gray-200 text-[1rem] text-left w-2/3 mt-3 mb-10 leading-7">
          By following these steps, you should be able to identify and resolve
          the issue with the button not scaling on hover and click. If the issue
          persists, please provide more details about your projects styles and
          any error messages you encounter, and I will do my best to assist
          further.
        </p>

        {/* The buttons of the header area */}
        <div className="relative flex flex-wrap">
          <Button href="/about" label="About Us" className="mr-4" />
          <Button href="/contact" label="Contact Us" />

          {/* Button above the carousel (HeroAreaCarousel) component */}
          <div className="absolute ml-auto z-40 top-24 right-52">
            <Button href="/products" label="Shop Now" />
          </div>
        </div>
      </div>

      {/* Carousel component */}
      <HeroAreaCarousel />
    </header>
  );
};

export default HeroArea;
