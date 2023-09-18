import axios from "axios";
import React from "react";
import Wrapper from "../wrapper/Wrapper";
import ProductCard from "../product-card/ProductCard";
import Title from "../UI/title/Title";
import ButtonLink from "../UI/button-link/ButtonLink";

const url =
  "http://127.0.0.1:1337/api/products?pagination[start]=0&pagination[limit]=6&populate=*";

const AllProducts = async () => {
  const response = await axios.get(url);
  const data = response.data;

  return (
    <Wrapper>
      <Title title={"Available Products"} className="mt-12" />
      <div class="grid grid-cols-3 gap-x-5 gap-y-10">
        {data?.data?.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <ButtonLink href="/products" label="Show More" />
      </div>
    </Wrapper>
  );
};

export default AllProducts;
