"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
// Components
import ProductCard from "../components/product-card";
import Wrapper from "../components/wrapper";
import PaginationComponent from "../components/pagination";
import LoadingSpinner from "../components/loading-spinner";

/**
 * Products page
 * @returns {JSX.Element}
 */
const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState({
    name: "",
    discounted_price: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 9; // 9 products I want to show in each page.

  /**
   * Fetch product
   * Search product by name.
   * Filter product by discount price
   * Sort product based on asc, desc
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `http://127.0.0.1:1337/api/products?pagination[page]=${currentPage}&pagination[pageSize]=${itemsPerPage}&populate=*`;

        if (filterOption.name) {
          url += `&filters[name][$containsi]=${filterOption.name}`;
        } else if (filterOption.discounted_price) {
          url += `&filters[discounted_price][$lte]=${filterOption.discounted_price}`;
        } else if (sortOption) {
          url += `&sort[0]=name:${sortOption}`;
        }

        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, sortOption, filterOption]);

  // Hook for change 'isLoading' state's value (boolean) based on data.
  useEffect(() => {
    // Check if data is empty (or null, or undefined) and set isLoading accordingly
    if (!products || Object.keys(products).length === 0) {
      setIsLoading(true); // Set to true when data is empty
    } else {
      setIsLoading(false); // Set to false when data is not empty
    }
  }, [products]);

  // Calculate total pages to show pagination.
  const totalProducts = products?.meta?.pagination?.total;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // Function to filter or search by name.
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOption({
      ...filterOption,
      [name]: value,
    });
  };

  // Function to sort by asc or desc.
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Function to clear filter or search history.
  const clearFilter = (property) => {
    setFilterOption({
      ...filterOption,
      [property]: "",
    });
  };

  return (
    <Wrapper>
      <div className="mt-32">
        {/* Page title */}
        <h1 className="mb-6 text-4xl text-gray-100 text-center font-bold">
          Welcome to House of Products 🙂
        </h1>

        {/* Searching, filtering, sorting - start */}
        <div className="flex items-center justify-between text-gray-100">
          {/* Search or filter by name. */}
          <div className="flex flex-col">
            <label htmlFor="search" className="text-lg mb-1">
              Search Product by Name
            </label>
            <div className="flex">
              {" "}
              {/* Wrap input and button in a flex container */}
              <input
                type="text"
                id="search"
                name="name"
                value={filterOption.name}
                onChange={handleFilterChange}
                className="w-[22rem] text-gray-900 text-base py-2 px-1 rounded-sm"
              />
              {filterOption.name && (
                <button
                  onClick={() => clearFilter("name")}
                  className="-ml-6 text-red-600 hover:scale-105 active:scale-100"
                >
                  &#x2716; {/* Unicode for a cross sign */}
                </button>
              )}
            </div>
          </div>

          {/* Filter by discounted price */}
          <div className="flex flex-col">
            <label htmlFor="discounted_price" className="text-lg mb-1">
              Filter by Discount Price
            </label>
            <select
              id="discounted_price"
              name="discounted_price"
              value={filterOption.discounted_price}
              onChange={handleFilterChange}
              className="w-[14rem] text-gray-900 text-base py-2 px-1 rounded-sm"
            >
              <option value="">Select Price</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="flex flex-col">
            <label htmlFor="sortOption" className="text-lg mb-1">
              Sort Products
            </label>
            <select
              id="sortOption"
              name="sortOption"
              value={sortOption}
              onChange={handleSortChange}
              className="w-[14rem] text-gray-900 text-base py-2 px-1 rounded-sm"
            >
              <option value="">None</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        {/* Searching, filtering, sorting - start */}

        {/* Show all products and pagination */}
        {isLoading ? (
          <div className="mt-20">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="w-full mt-6">
            <div className="grid grid-cols-3 gap-x-5 gap-y-10">
              {products?.data?.map((item) => (
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
      </div>
    </Wrapper>
  );
};

export default ProductsPage;
