import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const Button = ({ href, label, onClick, target, className }) => {
  return (
    <div>
      <Link
        href={href}
        onClick={onClick}
        target={target}
        class={`bg-green-600 hover:bg-green-700 text-gray-200 px-6 py-3 rounded-full ${
          className || ""
        }`}
      >
        {label}
      </Link>
    </div>
  );
};

Button.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Button;
