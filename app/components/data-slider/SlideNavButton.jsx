import React from "react";
import { useSwiper } from "swiper/react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

/**
 * A reusable component for navigation buttons in a swiper/slider component.
 *
 * This component provides buttons to navigate to the previous and next slides.
 *
 * @returns {JSX.Element} - Returns a component with navigation buttons.
 */
const SlideNavButton = () => {
  const swiper = useSwiper();

  return (
    <div className="flex items-center justify-end mt-4">
      {/* Navigation Button for Previous Slide */}
      <button
        className="bg-blue-300 px-2 py-1 rounded-md"
        onClick={() => swiper.slidePrev()}
      >
        <GrPrevious />
      </button>

      {/* Navigation Button for Next Slide */}
      <button
        className="bg-blue-300 px-2 py-1 ml-3 rounded-md"
        onClick={() => swiper.slideNext()}
      >
        <GrNext />
      </button>
    </div>
  );
};

export default SlideNavButton;
