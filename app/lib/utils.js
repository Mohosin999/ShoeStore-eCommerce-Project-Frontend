import axios from "axios";

// Define a reusable function to fetch order information
/**
 * A reusable function to fetch data.
 *
 * @param {string} url - It will be your specific url.
 * @param {function} setState - A function to set the fetched information in state.
 * @returns {void}
 */
export const fetchedDataFromBackend = async (url, setState) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEAREER_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const orderInfo = response.data;

    // If order info is exist, set it inside state.
    if (orderInfo) {
      setState(orderInfo);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Calculate product's price discount percentage.
 *
 * @param {number} originalPrice - The original price of the product (must be greater than zero).
 * @param {number} discountedPrice - The discounted price of the product (must be less than the original price).
 * @returns {number} The calculated discount percentage.
 * @throws {Error} If originalPrice is not greater than zero or discountedPrice is not less than the original price.
 */
export const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
  if (originalPrice <= 0) {
    throw new Error("Original price must be greater than zero.");
  }

  if (originalPrice <= discountedPrice) {
    throw new Error("Discounted price must be less than the original price.");
  }

  const discountAmount = originalPrice - discountedPrice;
  const discountPercentage = (discountAmount / originalPrice) * 100;

  return discountPercentage;
};
