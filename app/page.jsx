import React from "react";
import HeaderBody from "./components/full-header-area/header-body";
import HotDiscountSlider from "./components/hot-discount-slider";
import Banner from "./components/banner";
import AvailableProducts from "./components/available-products";
import TestimonialSection from "./components/testimonial-section";

const Home = () => {
  return (
    <div>
      <HeaderBody />
      <HotDiscountSlider />
      <Banner />
      <AvailableProducts />
      <TestimonialSection />
    </div>
  );
};

export default Home;
