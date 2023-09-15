import { useSwiper } from "swiper/react";

const SlideNavButton = () => {
  const swiper = useSwiper();

  return (
    <div class="flex items-center justify-end">
      {/* <div class="border-2 border-gray-200 w-fit px-2 py-1 rounded-xl mt-4 space-x-4"> */}
      <button
        class="bg-blue-300 p-1 rounded-md"
        onClick={() => swiper.slidePrev()}
      >
        Prev
      </button>
      <button
        class="bg-blue-300 p-1 rounded-md"
        onClick={() => swiper.slideNext()}
      >
        Next
      </button>
    </div>
  );
};

export default SlideNavButton;
