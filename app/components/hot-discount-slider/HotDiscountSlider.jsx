import React from "react";
import DataSlider from "../data-slider/DataSlider";

const url = "http://127.0.0.1:1337/api/products/hot-discount?populate=*";

const HotDiscountSlider = () => {
  return (
    <div>
      <DataSlider apiUrl={url} />
    </div>
  );
};

export default HotDiscountSlider;
