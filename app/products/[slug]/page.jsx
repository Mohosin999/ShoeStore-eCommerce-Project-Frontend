"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
// Swiper related styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Components
import Wrapper from "@/app/components/wrapper/Wrapper";
import ProductImagesSlider from "@/app/components/product-images-slider";
import Title from "@/app/components/UI/title/Title";
import Heading from "@/app/components/UI/heading";
import Button from "@/app/components/UI/button";
import DataSlider from "@/app/components/data-slider/DataSlider";

const ProductPage = ({ params }) => {
  const slug = params.slug;
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);

  const commonUrl = product?.data?.data?.[0]?.attributes;

  // Hook function for fetching specific product's data
  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const fetchData = await axios.get(
          `http://127.0.0.1:1337/api/products?populate=*&filters[slug][$eq]=${slug}`
        );
        setProduct(fetchData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchFunction();
  }, [slug]);

  // Hook function for fetching related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const fetchRelatedData = await axios.get(
          `http://127.0.0.1:1337/api/products?populate=*&filters[slug][$startsWithi]=${slug.slice(
            0,
            3
          )}`
        );
        setRelatedProducts(fetchRelatedData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchRelatedProducts();
  });

  return (
    <Wrapper>
      <div class="flex mt-24">
        {/* Left side product's images */}
        <div class="w-2/4 px-6 py-3">
          <ProductImagesSlider images={commonUrl?.images?.data} />
        </div>

        {/* Right side product's details */}
        <div class="w-2/4 px-6 py-3 text-white">
          {product?.data ? (
            <>
              {/* Product title area */}
              <div>
                <Title title={commonUrl?.name} />
              </div>

              {/* Product description area */}
              <div>
                <Heading name="Description:" />
                {commonUrl?.description}
              </div>

              {/* Product price area - start */}
              <div>
                <Heading name="Price" className="mt-6" />
                <div class="flex items-center">
                  {/* If discounted price exist, original price style will be "line-through" */}
                  {commonUrl?.discounted_price ? (
                    <p class="line-through">
                      Original Price: ${commonUrl?.original_price}
                    </p>
                  ) : (
                    <p>Price: ${commonUrl?.original_price}</p>
                  )}

                  {/* If discounted price exist, this portion will be execute */}
                  {commonUrl?.discounted_price && (
                    <p class="ml-10">Price: ${commonUrl?.discounted_price}</p>
                  )}
                </div>
              </div>
              {/* Product price area - end */}

              {/* Buttons */}
              <div class="flex items-center mt-10">
                <Button label="Add to Cart" />
                <Button label="Add to Wishlist" className="ml-3" />
                <Button label="Continue Shopping" className="ml-3" />
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      <div class="mt-5">
        <DataSlider data={relatedProducts?.data} title="Related Products" />
      </div>
    </Wrapper>
  );
};

export default ProductPage;
