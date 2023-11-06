"use client";
import React, { useEffect, useState } from "react";
// Components
import Wrapper from "@/app/components/wrapper";
import ProductCard from "@/app/components/product-card";
import PaginationComponent from "@/app/components/pagination";
import LoadingSpinner from "@/app/components/loading-spinner";
// Function
import { fetchedDataFromBackend } from "@/app/lib/utils";

/**
 * Category page
 * @returns {JSX.Element}
 */
const CategoryPage = ({ params }) => {
  const [categoryData, setCategoryData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 9; // 9 products I want to show in each page.

  // Fetch the category data.
  useEffect(() => {
    const categoriesDataUrl = `http://127.0.0.1:1337/api/products?pagination[page]=${currentPage}&pagination[pageSize]=${itemsPerPage}&populate=*&filters[category][slug][$eq]=${params.slug}`; // url
    fetchedDataFromBackend(categoriesDataUrl, setCategoryData); // function
  }, [currentPage]);

  // Hook for change 'isLoading' state's value (boolean) based on data.
  useEffect(() => {
    // Check if data is empty (or null, or undefined) and set isLoading accordingly
    if (!categoryData || Object.keys(categoryData).length === 0) {
      setIsLoading(true); // Set to true when data is empty
    } else {
      setIsLoading(false); // Set to false when data is not empty
    }
  }, [categoryData]);

  // Calculate total pages to show pagination.
  const totalProducts = categoryData?.meta?.pagination?.total;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return (
    <Wrapper>
      {isLoading ? (
        <div className="mt-32">
          <LoadingSpinner />{" "}
          {/* Show loading spinner if the page is loading. */}
        </div>
      ) : (
        <div className="mt-32">
          <div className="grid grid-cols-3 gap-x-5 gap-y-10">
            {categoryData?.data?.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>

          {/* Pagination of this page. */}
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
      )}
    </Wrapper>
  );
};

export default CategoryPage;
