import React from "react";
import HeaderBody from "./components/header-body/HeaderBody";
import HotDiscountSlider from "./components/hot-discount-slider/HotDiscountSlider";
import BannerCard from "./components/banner-card/BannerCard";

const Home = () => {
  return (
    <div>
      <HeaderBody />
      <HotDiscountSlider />
      <BannerCard />
    </div>
  );
};

export default Home;
