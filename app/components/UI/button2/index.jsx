import React from "react";
import PropTypes from "prop-types";

const Button2 = ({ label, onClick, className }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        class={`bg-yellow-700 hover:bg-green-600 text-gray-200 px-6 py-3 rounded-full group ${
          className || ""
        }`}
      >
        <div className="group-active:scale-95">{label}</div>
      </button>
    </div>
  );
};

Button2.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button2;
