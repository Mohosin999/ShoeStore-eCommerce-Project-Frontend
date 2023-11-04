import React from "react";
import HeroArea from "./components/hero-area";
import HotDiscountSlider from "./components/hot-discount-slider";
import Banner from "./components/banner";
import AvailableProducts from "./components/available-products";
import TestimonialSection from "./components/testimonial-section";

const Home = () => {
  return (
    <div>
      <HeroArea />
      <HotDiscountSlider />
      <Banner />
      <AvailableProducts />
      <TestimonialSection />
    </div>
  );
};

export default Home;
