// comment
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

// Swiper related styles.
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Components
import Wrapper from "@/app/components/wrapper";
import ProductImagesSlider from "@/app/components/product-images-slider";
import Title from "@/app/components/UI/title";
import Heading from "@/app/components/UI/heading";
import Button from "@/app/components/UI/button";
import DataSlider from "@/app/components/data-slider";

import { useStoreActions, useStoreState } from "easy-peasy";
import TostifyMessage from "@/app/components/tostify-message";

/**
 * Single product page component.
 * Destructuring {params} is not given props, it's from default system.
 * @returns {JSX.Element}
 */
const ProductPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isExist, setIsExist] = useState(false);

  // Destructure addToCart from the store.
  const { addToCart } = useStoreActions((actions) => actions.cartPortion);
  const { items } = useStoreState((state) => state.cartPortion);

  /**
   * Define a variable and store your desired slug.
   * Params is - "http://localhost:3000/products/running-shoes-04" and,
   * Slug is - "/running-shoes-04".
   */
  const slug = params.slug;

  // Store the common url in a variable.
  const commonUrl = product?.data?.data?.[0]?.attributes;

  /**
   * The following function is for adding product to a cart.
   * Here ( product?.data?.data?.[0] ) is a single product where we are located.
   * When the function is called, product will be added to the cart.
   */
  const addToCartFunc = () => {
    const addedProduct = product?.data?.data?.[0];

    // Check if the product with the same ID is already in the cart
    const isProductInCart = items.some((item) => item.id === addedProduct.id);

    if (isProductInCart) {
      // If the product is already in the cart, set isExist to true and hide the success popup
      setIsExist(true);
      setShowSuccessPopup(false);

      // Automatically hide the success popup after 3 seconds (3000 milliseconds)
      // setTimeout(() => {
      //   setIsExist(false);
      // }, 9000);
    } else {
      // If the product is not in the cart, add it to the cart, set isExist to false, and show the success popup
      addToCart(addedProduct);
      setIsExist(false);
      setShowSuccessPopup(true);

      // Automatically hide the success popup after 3 seconds (3000 milliseconds)
      // setTimeout(() => {
      //   setShowSuccessPopup(false);
      // }, 9000);
    }
  };

  /**
   * Hook 01 - for fetching specific product's data.
   * This hook will be called when the slug changes.
   */
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

    // Call the function.
    fetchFunction();
  }, [slug]);

  /**
   * Hook 02 - for fetching related products.
   * This hook will be called for the first time only.
   */
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

    // Call the function.
    fetchRelatedProducts();
  }, []);

  return (
    <Wrapper>
      <div className="flex mt-24">
        {/* Left side product's images. */}
        <div className="w-2/4 px-6 py-3">
          <ProductImagesSlider images={commonUrl?.images?.data} />
        </div>

        {/* Right side product's details - start. */}
        <div className="w-2/4 px-6 py-3 text-white">
          {/* If data exist, execute the following codes. */}
          {product?.data && (
            <>
              {/* Product title */}
              <div>
                <Title title={commonUrl?.name} />
              </div>

              {/* Product description */}
              <div>
                <Heading name="Description:" />
                {commonUrl?.description}
              </div>

              {/* Product price - start */}
              <div>
                <Heading name="Price" className="mt-6" />
                <div className="flex items-center">
                  {commonUrl?.discounted_price ? (
                    <p className="line-through">
                      Original Price: ${commonUrl?.original_price}
                    </p>
                  ) : (
                    <p>Price: ${commonUrl?.original_price}</p>
                  )}

                  {/* If discounted price exist, this portion will be executed. */}
                  {commonUrl?.discounted_price && (
                    <p className="ml-10">
                      Price: ${commonUrl?.discounted_price}
                    </p>
                  )}
                </div>
              </div>
              {/* Product price area - end */}

              {/* Buttons */}
              <div className="relative flex items-center mt-10">
                <Button label="Add to Cart" onClick={addToCartFunc} />
                <Button label="Add to Wishlist" className="ml-3" />
                <Button label="Continue Shopping" className="ml-3" />

                {/* After clicking addToCart button, show success popup message */}
                {showSuccessPopup && (
                  <TostifyMessage
                    message={"Product added successfully !"}
                    className="bg-green-600"
                    setState={setShowSuccessPopup}
                  />
                )}

                {/* If product already added, show the following popup */}
                {isExist && (
                  <TostifyMessage
                    message={"The product exist in the cart !"}
                    setState={setIsExist}
                  />
                )}
              </div>
            </>
          )}
        </div>
        {/* Right side product's details - end. */}
      </div>

      {/* The following "div" shows the related product part. */}
      <div className="mt-5">
        <DataSlider data={relatedProducts?.data} title="Related Products" />
      </div>
    </Wrapper>
  );
};

export default ProductPage;
