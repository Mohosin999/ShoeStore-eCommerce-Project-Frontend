import React from "react";
import axios from "axios";
import DataSlider from "../data-slider/DataSlider";

const url = "http://127.0.0.1:1337/api/products/hot-discount?populate=*";

const HotDiscountSlider = async () => {
  // Fetch data from backend API
  const response = await axios.get(url);
  const fetchedData = response.data;

  return (
    <div>
      <DataSlider data={fetchedData} title="Hot Discount Products" />
    </div>
  );
};

export default HotDiscountSlider;
