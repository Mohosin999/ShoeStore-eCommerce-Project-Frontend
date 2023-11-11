import React from "react";
import PropTypes from "prop-types";

/**
 * A reusable component for rendering a title.
 *
 * @param {string} title - The title to be displayed.
 * @param {string} className - You can give your own style by it.
 * @returns {JSX.Element} - Returns a component to display title.
 */
const Title = ({ title, className }) => {
  return (
    <div
      class={`text-2xl md:text-3xl text-orange-400 font-bold mb-6 ${
        className || ""
      }`}
    >
      {title}
    </div>
  );
};

// Define PropTypes for the component
Title.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Title;
