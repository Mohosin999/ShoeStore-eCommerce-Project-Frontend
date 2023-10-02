import React from "react";
import HeaderBody from "./components/full-header-area/header-body";
import HotDiscountSlider from "./components/hot-discount-slider";
import BannerCard from "./components/banner-card";
import AllProducts from "./components/all-products";
import TestimonialCard from "./components/testimonial-card";

const Home = () => {
  return (
    <div>
      <HeaderBody />
      <HotDiscountSlider />
      <BannerCard />
      <AllProducts />
      <TestimonialCard />
    </div>
  );
};

export default Home;
