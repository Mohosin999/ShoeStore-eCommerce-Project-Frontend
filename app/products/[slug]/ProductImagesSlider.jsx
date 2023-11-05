import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
// Swiper related
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

/**
 * Product images slider component of single product page.
 * @param {Array} images - images will be an array.
 * @returns {JSX.Element}
 */
const ProductImagesSlider = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div>
      <div>
        <Swiper
          loop={true}
          spaceBetween={10}
          modules={[Navigation, Thumbs]}
          grabCursor={true}
          thumbs={{ swiper: thumbsSwiper }}
        >
          {/* Map the images array. */}
          {images?.map((image) => (
            <SwiperSlide key={image.id}>
              <Image
                src={image?.attributes.url}
                width={500}
                height={500}
                alt="Slider Image"
                class="w-full"
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
          slidesPerView={3}
          freeMode={true}
          watchSlidesVisibility={true}
          watchSlidesProgress={true}
        >
          {images?.map((image) => (
            <SwiperSlide key={image.id}>
              <Image
                src={image?.attributes.url}
                width={500}
                height={500}
                alt="Slider Image"
                class="w-full"
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
