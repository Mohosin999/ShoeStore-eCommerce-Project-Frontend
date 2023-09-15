import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const ButtonLink = ({ href, label, className }) => {
  return (
    <div>
      <Link
        href={href}
        class={`bg-green-700 hover:bg-green-600 text-gray-200 mr-4 px-6 py-3 rounded-full ${
          className || ""
        }`}
      >
        {label}
      </Link>
    </div>
  );
};

ButtonLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ButtonLink;
