// comment
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import { toast } from "react-toastify";
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
import ButtonLink from "@/app/components/UI/button-link";

/**
 * Single product page component.
 * Destructuring {params} is not given props, it's from default system.
 * @returns {JSX.Element}
 */
const ProductPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);

  // The following action and state for the cart.
  const { addToCart } = useStoreActions((actions) => actions.cartPortion);
  const { items } = useStoreState((state) => state.cartPortion);
  // The following action and state for the wishlist.
  const { addToWishlist } = useStoreActions(
    (actions) => actions.wishlistPortion
  );
  const { wishlistItems } = useStoreState((state) => state.wishlistPortion);

  /**
   * Define a variable and store your desired slug.
   * Params is - "http://localhost:3000/products/running-shoes-04" and,
   * Slug is - "/running-shoes-04".
   */
  const slug = params.slug;

  // Store the common url in a variable.
  const commonUrl = product?.data?.data?.[0]?.attributes;

  /**
   * Add to Cart.
   * Here ( product?.data?.data?.[0] ) is a single product where we are located.
   * When the function is called, product will be added to the cart.
   */
  const addToCartFunc = () => {
    // Here ( product?.data?.data?.[0] ) is a single product where we are located.
    const currentProduct = product?.data?.data?.[0];

    /**
     * Check if the product with the same ID is already in the cart.
     * Here some() method returns boolean.
     * The following checkup is only for showing the toast message.
     */
    const isProductInCart = items.some((item) => item.id === currentProduct.id);

    if (isProductInCart) {
      toast.error("The product is already present on the cart", {
        hideProgressBar: true,
        autoClose: 3000,
        position: "bottom-right",
      });
    } else {
      addToCart(currentProduct);
      toast.success("The product is added successfully!", {
        hideProgressBar: true,
        autoClose: 3000,
        position: "bottom-right",
      });
    }
  };

  /**
   * Add to Wishlist.
   * Here ( product?.data?.data?.[0] ) is a single product where we are located.
   * When the function is called, product will be added to the wishlist.
   */
  const addToWishlistFunc = () => {
    // Here ( product?.data?.data?.[0] ) is a single product where we are located.
    const currentProduct = product?.data?.data?.[0];

    /**
     * Check if the product with the same ID is already in the wishlist.
     * Here some() method returns boolean.
     * The following checkup is only for showing the toast message.
     */
    const isProductInWishlist = wishlistItems.some(
      (item) => item.id === currentProduct.id
    );

    if (isProductInWishlist) {
      toast.error("The product is already present on the wishlist", {
        hideProgressBar: true,
        autoClose: 3000,
        position: "bottom-right",
      });
    } else {
      addToWishlist(currentProduct);
      toast.success("The product is added successfully!", {
        hideProgressBar: true,
        autoClose: 3000,
        position: "bottom-right",
      });
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
                <Button
                  label="Add to Wishlist"
                  onClick={addToWishlistFunc}
                  className="ml-3"
                />
                <ButtonLink
                  href="/products"
                  label="Continue Shopping"
                  className="ml-3"
                />
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
