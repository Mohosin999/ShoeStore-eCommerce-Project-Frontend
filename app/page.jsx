import React from "react";
import HeaderBody from "./components/header-body/HeaderBody";
import HotDiscountSlider from "./components/hot-discount-slider/HotDiscountSlider";
import BannerCard from "./components/banner-card/BannerCard";
import AllProducts from "./components/all-products/AllProducts";
import TestimonialCard from "./components/testimonial-card/TestimonialCard";

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
