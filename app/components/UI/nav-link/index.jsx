import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const NavLink = ({
  href,
  label,
  onMouseEnter,
  onMouseLeave,
  showSubMenu,
  subMenuComponent,
}) => {
  return (
    <div>
      <Link
        href={href}
        class="text-gray-200 hover:bg-green-700 px-4 py-2 rounded-full relative"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {label}
        {showSubMenu && (
          <div className="absolute top-8 left-0">{subMenuComponent}</div>
        )}
      </Link>
    </div>
  );
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  showSubMenu: PropTypes.bool,
  subMenuComponent: PropTypes.element,
};

export default NavLink;
