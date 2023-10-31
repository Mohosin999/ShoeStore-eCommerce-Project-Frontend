import React from "react";
import { GrPrevious, GrNext } from "react-icons/gr";

const PaginationComponent = ({ currentPage, setCurrentPage, totalPages }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="mt-4 flex justify-center items-center">
      <button
        onClick={handlePreviousPage}
        className={`mx-2 px-3 py-3 rounded-full focus:outline-none ${
          currentPage === 1
            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        disabled={currentPage === 0}
      >
        <GrPrevious size={16} />
      </button>

      {Array.from({ length: 3 }).map((_, index) => (
        <button
          key={currentPage + index}
          onClick={() => handlePageChange(currentPage + index)}
          className={`mx-2 px-4 py-2 rounded-full focus:outline-none ${
            currentPage === currentPage + index
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {currentPage + index}
        </button>
      ))}

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

export default PaginationComponent;
