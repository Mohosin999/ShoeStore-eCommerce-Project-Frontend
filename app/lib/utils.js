// Calculate product's price discount percentage.
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
