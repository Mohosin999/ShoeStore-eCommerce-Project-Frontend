"use client";
import React, { useEffect, useState } from "react";
// Components
import Wrapper from "@/app/components/wrapper";
import ProductCard from "@/app/components/product-card";
import PaginationComponent from "@/app/components/pagination";
// Function
import { fetchedDataFromBackend } from "@/app/lib/utils";

/**
 * Category page
 * @returns {JSX.Element}
 */
const CategoryPage = ({ params }) => {
  const [categoryData, setCategoryData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  // Fetch the category data.
  useEffect(() => {
    const categoriesDataUrl = `http://127.0.0.1:1337/api/products?pagination[page]=${currentPage}&pagination[pageSize]=${itemsPerPage}&populate=*&filters[category][slug][$eq]=${params.slug}`;
    // const categoriesDataUrl = `http://127.0.0.1:1337/api/products?populate=*&filters[category][slug][$eq]=${params.slug}`;
    fetchedDataFromBackend(categoriesDataUrl, setCategoryData);
  }, [currentPage]);

  const totalProducts = categoryData?.meta?.pagination?.total;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return (
    <Wrapper>
      <div className="mt-32">
        <div className="grid grid-cols-3 gap-x-5 gap-y-10">
          {categoryData?.data?.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom Pagination of this page. */}
        {totalProducts > itemsPerPage && (
          <div className="mt-6">
            <PaginationComponent
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default CategoryPage;
