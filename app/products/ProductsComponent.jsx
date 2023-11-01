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
    original_price: "",
    discounted_price: "",
  });

  console.log(products);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `http://127.0.0.1:1337/api/products?pagination[page]=${currentPage}&pagination[pageSize]=${itemsPerPage}&populate=*`;

        if (filterOption.name) {
          url += `&filters[name][$containsi]=${filterOption.name}`;
        } else if (filterOption.original_price) {
          url += `&filters[original_price][$lte]=${filterOption.original_price}`;
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
      <div className="mt-28">
        {/* Left side */}
        <div className="w-full bg-gray-600 p-10">
          <h1>Left Side</h1>
          <h1 className="text-gray-200 text-lg">Filtering:</h1>
          {/* Filtering */}
          <div>
            <div>
              <label htmlFor="nameFilter">Filter by Name:</label>
              <input
                type="text"
                id="nameFilter"
                name="name"
                value={filterOption.name}
                onChange={handleFilterChange}
              />
              {filterOption.name && (
                <button onClick={() => clearFilter("name")}>
                  &#x2716; {/* Unicode for a cross sign */}
                </button>
              )}
            </div>

            <div>
              <label htmlFor="originalPriceFilter">
                Filter by Original Price:
              </label>
              <input
                type="text"
                id="originalPriceFilter"
                name="original_price"
                value={filterOption.original_price}
                onChange={handleFilterChange}
              />
              {filterOption.original_price && (
                <button onClick={() => clearFilter("original_price")}>
                  &#x2716; {/* Unicode for a cross sign */}
                </button>
              )}
            </div>

            <div>
              <label htmlFor="discountedPriceFilter">
                Filter by Discounted Price:
              </label>
              <input
                type="text"
                id="discountedPriceFilter"
                name="discounted_price"
                value={filterOption.discounted_price}
                onChange={handleFilterChange}
              />
              {filterOption.discounted_price && (
                <button onClick={() => clearFilter("discounted_price")}>
                  &#x2716; {/* Unicode for a cross sign */}
                </button>
              )}
            </div>

            {/* Your component's content */}
          </div>

          {/* Sorting */}
          <div className="bg-green-400 mt-10">
            <label>Sorting:</label>
            <div>
              <input
                type="radio"
                id="none"
                name="sortOption"
                value=""
                checked={false}
                onChange={handleSortChange}
              />
              <label htmlFor="none">None</label>
            </div>
            <div>
              <input
                type="radio"
                id="ascSort"
                name="sortOption"
                value="asc"
                checked={sortOption === "asc"}
                onChange={handleSortChange}
              />
              <label htmlFor="ascSort">Ascending</label>
            </div>
            <div>
              <input
                type="radio"
                id="descSort"
                name="sortOption"
                value="desc"
                checked={sortOption === "desc"}
                onChange={handleSortChange}
              />
              <label htmlFor="descSort">Descending</label>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full">
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
