"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/product-card";
import Wrapper from "../components/wrapper";
import PaginationComponent from "../components/pagination";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState({
    name: "",
    discounted_price: "",
  });

  const itemsPerPage = 9;

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

  const totalProducts = products?.meta?.pagination?.total;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOption({
      ...filterOption,
      [name]: value,
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const clearFilter = (property) => {
    setFilterOption({
      ...filterOption,
      [property]: "",
    });
  };

  return (
    <Wrapper>
      <div className="mt-32">
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
            <input
              type="text"
              id="search"
              name="name"
              value={filterOption.name}
              onChange={handleFilterChange}
              className="w-[22rem] text-gray-900 text-base py-2 px-1 rounded-sm"
            />
            {filterOption.name && (
              <button onClick={() => clearFilter("name")}>
                &#x2716; {/* Unicode for a cross sign */}
              </button>
            )}
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
        <div className="w-full mt-6">
          <div className="grid grid-cols-3 gap-x-5 gap-y-10">
            {products?.data?.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>

          {/* Bottom Pagination of this page. */}
          <div className="mt-6">
            <PaginationComponent
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductList;
