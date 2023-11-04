import React from "react";
import PropTypes from "prop-types";
import { GrPrevious, GrNext } from "react-icons/gr";

/**
 * PaginationComponent is a reusable component for navigating through a paginated list.
 *
 * @param {number} currentPage - The current page number.
 * @param {function} setCurrentPage - A function to set the current page.
 * @param {number} totalPages - The total number of pages.
 */
const PaginationComponent = ({ currentPage, setCurrentPage, totalPages }) => {
  /**
   * Handles a page change when a specific page button is clicked.
   *
   * @param {number} newPage - The page number to navigate to.
   */
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  /**
   * Handles navigating to the previous page when the "Previous" button is clicked.
   */
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  /**
   * Handles navigating to the next page when the "Next" button is clicked.
   */
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-end">
      {/* Previous button */}
      <button
        onClick={handlePreviousPage}
        className={`mx-2 px-3 py-3 rounded-full focus:outline-none ${
          currentPage === 1
            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        disabled={currentPage === 1}
      >
        <GrPrevious size={16} />
      </button>

      {/* Pagination pages */}
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`mx-2 px-4 py-2 rounded-full focus:outline-none ${
            currentPage === index + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {/* Pagination page will start from 1, that's why index+1 (0+1). */}
          {index + 1}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={handleNextPage}
        className={`mx-2 px-3 py-3 rounded-full focus:outline-none ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        disabled={currentPage === totalPages}
      >
        <GrNext size={16} />
      </button>
    </div>
  );
};

// PropTypes for type checking
PaginationComponent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default PaginationComponent;