import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import useSWR from "swr";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import useButtonClickedEvent from "@/hooks/useButtonClickedEvent";

const maxResult = 6;

const ProductsPage = ({ products }) => {
  let [pageIndex, setPageIndex] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState();
  const [searchOption, setSearchOption] = useState("");

  const { handleClick, highlighted } = useButtonClickedEvent();

  const { theme } = useTheme();
  const router = useRouter();

  // Pagination logic - start
  const { data, isLoading } = useSWR(
    // Sorting endpoint
    sortOption
      ? `/api/products?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}&sort[0]=price:${sortOption}`
      : // Filtering endpoint
      filterOption
      ? `/api/products?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}&filters[price][$lte]=${filterOption}`
      : // Searching endpoint
      searchOption
      ? `/api/products?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}&filters[name][$eq]=${searchOption}`
      : // Root endpoint
        `/api/products?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    fetchDataFromApi,
    { fallbackData: products }
  );
  // Pagination logic - end

  return (
    <Wrapper>
      <div className="flex flex-wrap">
        <div className="w-1/3">
          <div className="mt-5">
            {/* Heading area */}
            <div className="flex">
              {/* Heading */}
              <h2 className="text-bold text-[24px] text-orange-600">
                More Actions <span className="text-gray-300">/</span>
              </h2>
              {/* Back button */}
              <button
                className={`ml-2 mt-auto text-sm text-blue-600 hover:text-blue-700
                cursor-pointer rounded-full px-2 py-1 ${
                  highlighted ? "bg-gray-300" : ""
                }`}
                onClick={() => handleClick("")}
              >
                Go Back
              </button>
            </div>

            {/* Features area */}
            <div className="mt-14">
              {/* Sorting - sort by price - start */}
              <div className="mt-4">
                <h3 className="text-bold text-[20px] text-green-600 mb-1">
                  Sort by Price
                </h3>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-gray-200 px-2 py-1 text-sm"
                >
                  <option value="">Default</option>
                  <option value="asc">Lowest to Highest</option>
                  <option value="desc">Highest to Lowest</option>
                </select>
              </div>
              {/* Sorting - sort by price - end */}

              {/* Filtering - filter by price - start */}
              <div className="mt-10">
                <h3 className="text-bold text-[20px]  text-green-600 mb-1">
                  Filter by Price
                </h3>
                <input
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                  type="search"
                  placeholder="equal and less than"
                  className="bg-gray-200 px-2 py-1 text-sm"
                />
              </div>
              {/* Filtering - filter by price - end */}

              {/* Filter by name - start */}
              <div className="mt-10">
                <h3 className="text-bold text-[20px] text-green-600 mb-1">
                  Filter by Name
                </h3>
                <input
                  value={searchOption}
                  onChange={(e) => setSearchOption(e.target.value)}
                  type="search"
                  placeholder="type exect name"
                  className="bg-gray-200 px-2 py-1 text-sm"
                />
              </div>
              {/* Filter by name - end */}
            </div>
          </div>
        </div>

        {/* Show fetching products grid - start */}
        <div className="w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-5 mb-5 px-5 md:px-0">
          {data?.data?.map((product) => {
            return <ProductCard key={product?.id} data={product} />;
          })}
        </div>
        {/* Show fetching products grid - end */}

        {/* Pagination button - start */}
        {data?.meta?.pagination?.total > maxResult && (
          <div className="flex gap-3 items-center justify-center my-16 md:mb-8 md:mt-0 ml-auto">
            <button
              className={`${
                theme === "dark"
                  ? "bg-gray-200 disabled:bg-gray-500 text-gray-800 disabled:text-gray-300"
                  : "bg-gray-800 disabled:bg-gray-500 text-gray-200 disabled:text-gray-300"
              } rounded py-2 px-4 `}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span
              className={`${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              } font-bold`}
            >{`${pageIndex} of ${
              data && data.meta.pagination.pageCount
            }`}</span>

            <button
              className={`${
                theme === "dark"
                  ? "bg-gray-200 disabled:bg-gray-500 text-gray-800 disabled:text-gray-300"
                  : "bg-gray-800 disabled:bg-gray-500 text-gray-200 disabled:text-gray-300"
              } rounded py-2 px-4`}
              disabled={pageIndex === (data && data.meta.pagination.pageCount)}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )}
        {/* Pagination button - end */}
        {/* If loading, then this loading logo shows - start */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}
        {/* If loading, then this loading logo shows - start */}
      </div>
    </Wrapper>
  );
};

export default ProductsPage;

export async function getServerSideProps(context) {
  // Fetch all products for products page - pagination
  const products = await fetchDataFromApi(
    "/api/products?populate=*&pagination[page]=1&pagination[pageSize]=6"
  );

  return {
    props: { products },
  };
}
