import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const NavLink = ({ href, label }) => {
  return (
    <div>
      <Link
        href={href}
        class="bg-green-700 hover:bg-green-600 text-gray-200 mr-4 px-6 py-3 rounded-full"
      >
        {label}
      </Link>
    </div>
  );
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default NavLink;
