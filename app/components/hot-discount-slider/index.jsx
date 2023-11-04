import React from "react";
import axios from "axios";
import DataSlider from "../data-slider";

/**
 * A component for displaying a slider of hot discount products.
 * Fetches the data from the backend API and passes it to the DataSlider component.
 *
 * @returns {JSX.Element}
 */
const HotDiscountSlider = async () => {
  // Hot discounted product endpoint
  const url = "http://127.0.0.1:1337/api/products/hot-discount?populate=*";

  // Fetch data from backend API
  const response = await axios.get(url);
  const fetchedData = response.data;

  return (
    <div className="mt-16">
      <DataSlider data={fetchedData} title="Hot Discount Products" />
    </div>
  );
};

export default HotDiscountSlider;
