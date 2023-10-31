"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "@/app/components/wrapper";
import axios from "axios";
import ProductCard from "@/app/components/product-card";

const CategoryPage = ({ params }) => {
  const [categoryData, setCategoryData] = useState(null);

  /**
   * Fetch category data and set it inside state.
   * So that, we can use it next time from other page.
   */
  useEffect(() => {
    const FetchCategoryData = async () => {
      const categoriesData = await axios.get(
        `http://127.0.0.1:1337/api/products?populate=*&filters[category][slug][$eq]=${params.slug}`
      );
      setCategoryData(categoriesData.data);
    };

    FetchCategoryData();
  }, []);

  return (
    <Wrapper>
      <div className="mt-32">
        <div className="grid grid-cols-3 gap-x-5 gap-y-10">
          {categoryData?.data?.map((item) => (
            <ProductCard item={item} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default CategoryPage;
