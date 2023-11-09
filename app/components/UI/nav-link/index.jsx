import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const NavLink = ({
  href,
  label,
  onClick,
  onMouseEnter,
  onMouseLeave,
  showCatMenu,
  catMenuComponent,
  className,
}) => {
  return (
    <div>
      <Link
        href={href}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className={`text-gray-900 lg:text-gray-200 block hover:bg-gray-300 lg:hover:bg-green-700 px-4 py-2 relative ${className}`}
      >
        {label}
        {showCatMenu && (
          <div className="absolute top-8 left-0">{catMenuComponent}</div>
        )}
      </Link>
    </div>
  );
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  showSubMenu: PropTypes.bool,
  subMenuComponent: PropTypes.element,
};

export default NavLink;
