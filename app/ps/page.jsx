import React from "react";
import HotDiscountSlider from "../components/hot-discount-slider/HotDiscountSlider";
import TestSlider from "../components/TestSlider";
// import DataSlider from "../components/data-slider/DataSlider";

const SliderPage = () => {
  return (
    <div class="rounded-lg mx-4 p-4">
      <h1>SliderPage</h1>
      <br />

      {/* Slider Component */}
      {/* <DataSlider />             */}
      <HotDiscountSlider />
      <TestSlider />
    </div>
  );
};

export default SliderPage;
