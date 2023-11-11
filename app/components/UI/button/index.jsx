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
        className={`bg-green-600 hover:bg-green-700 active:scale-95 text-gray-200 text-xs xl:text-base px-4 xl:px-6 py-2 xl:py-3 rounded-full ${
          className || ""
        }`}
      >
        {label}
      </Link>
    </div>
  );
};

Button.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Button;
