import React from "react";
import axios from "axios";
// Components
import Wrapper from "../wrapper";
import ProductCard from "../product-card";
import Title from "../UI/title";
import Button from "../UI/button";

/**
 * Asynchronous component to fetch and display available products in Homepage.
 * @returns {JSX.Element}
 */
const AvailableProducts = async () => {
  // Define the URL for fetching only 6 products from the available products.
  const url =
    "http://127.0.0.1:1337/api/products?pagination[start]=0&pagination[limit]=6&populate=*";

  // Send a GET request to the specified URL.
  const response = await axios.get(url);

  // Extract data from the response.
  const data = response.data;

  return (
    <Wrapper>
      {/* Display the title for available products. */}
      <Title title={"Available Products"} className="mt-12" />

      {/* Create a grid for displaying product cards. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
        {data?.data?.map((item) => (
          // Render individual product cards.
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      {/* Display a button for showing more products. */}
      <div className="flex justify-end mt-6">
        <Button href="/products" label="Show More" />
      </div>
    </Wrapper>
  );
};

export default AvailableProducts;
