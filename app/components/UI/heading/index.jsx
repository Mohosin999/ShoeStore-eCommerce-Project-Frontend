import React from "react";
import PropTypes from "prop-types";

/**
 * A reusable component for rendering a name.
 *
 * @param {string} name - The name to be displayed.
 * @param {string} className - You can give your own style by it.
 * @returns {JSX.Element} - Returns a component to display name.
 */
const Heading = ({ name, className }) => {
  return (
    <div class={`text-xl text-green-400 font-bold mb-2 ${className || ""}`}>
      {name}
    </div>
  );
};

// Define PropTypes for the component
Heading.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Heading;
