import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

/**
 * This is Testimonial Card Component
 *
 * @param {string} img - img will be a string.
 * @param {string} name - name will be a string.
 * @param {string} comment - comment will be a string.
 * @returns {JSX.Element}
 */
const TestimonialCard = ({ img, name, comment }) => {
  return (
    <div className="w-full flex flex-wrap items-center bg-gray-800 shadow-md overflow-hidden">
      <div className="flex items-center md:py-4 lg:py-0 xl:py-4">
        {/* Product's Image */}
        <div className="flex-shrink-0 pl-4 w-1/3">
          <Image src={img} width={500} alt="shoe" />
        </div>
        <div className="p-3 md:p-8">
          {/* Commenter's name */}
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {name}
          </div>
          {/* Commenter's comment */}
          <p className="mt-2 text-gray-400 text-xs">{comment}</p>
        </div>
      </div>
    </div>
  );
};

// PropTypes for type checking
TestimonialCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default TestimonialCard;
