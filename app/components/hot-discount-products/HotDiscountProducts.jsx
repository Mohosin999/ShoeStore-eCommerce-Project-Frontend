import React from "react";
import axios from "axios";

const HotDiscountProducts = async () => {
  const res = await axios.get("http://127.0.0.1:1337/api/products?populate=*");
  const data = res.data;

  return (
    <div>
      {data?.data &&
        data?.data.map((product) => (
          <div key={product.id}>
            {product.attributes.hot_discount === true && (
              <div>
                <h2>{product.attributes.name}</h2>
                <p>{product.attributes.description}</p>
                <p>Original Price: ${product.attributes.original_price}</p>
                <p>Discounted Price: ${product.attributes.discounted_price}</p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default HotDiscountProducts;
