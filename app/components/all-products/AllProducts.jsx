import axios from "axios";
import React from "react";
import Wrapper from "../wrapper/Wrapper";
import ProductCard from "../product-card/ProductCard";

const url = "http://127.0.0.1:1337/api/products?populate=*";

const AllProducts = async () => {
  const response = await axios.get(url);
  const data = response.data;

  return (
    <Wrapper>
      <div>
        {data?.data?.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </Wrapper>
  );
};

export default AllProducts;
