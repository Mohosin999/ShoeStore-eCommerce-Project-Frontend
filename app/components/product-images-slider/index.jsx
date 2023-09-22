import React, { useState } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductImagesSlider = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState();

  return (
    <div>
      <div className="swiper-container">
        <Swiper
          loop={true}
          spaceBetween={10}
          // navigation={true}
          modules={[Navigation, Thumbs]}
          grabCursor={true}
          thumbs={{ swiper: thumbsSwiper }}
        >
          {images?.map((image) => (
            <SwiperSlide key={image.id}>
              <img
                src={image?.attributes.url}
                alt="Slider Image"
                className="w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-5 swiper-container">
        <Swiper
          onSwiper={(swiper) => {
            // Store the swiper instance to use for thumbs
            setThumbsSwiper(swiper);
          }}
          spaceBetween={10}
          slidesPerView={3} // Adjust this value for the number of thumbnail images you want to display
          freeMode={true}
          watchSlidesVisibility={true}
          watchSlidesProgress={true}
          className="product-thumbs-slider swiper-scrollbar"
        >
          {images?.map((image, index) => (
            <SwiperSlide key={image.id}>
              <img
                src={image?.attributes.url}
                alt="Thumbnail Image"
                className="w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

ProductImagesSlider.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ProductImagesSlider;
