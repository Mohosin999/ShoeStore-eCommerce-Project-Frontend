import React from "react";
import HeaderBody from "./components/header-body/HeaderBody";
import HotDiscountSlider from "./components/hot-discount-slider/HotDiscountSlider";
import BannerCard from "./components/banner-card/BannerCard";
import AllProducts from "./components/all-products/AllProducts";

const Home = () => {
  return (
    <div>
      <HeaderBody />
      <HotDiscountSlider />
      <BannerCard />
      <AllProducts />
    </div>
  );
};

export default Home;
