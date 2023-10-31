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
}) => {
  return (
    <div>
      <Link
        href={href}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className="text-gray-100 hover:bg-gray-800/75 px-4 py-2 relative"
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
