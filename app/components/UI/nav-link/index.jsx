import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { BsChevronDown } from "react-icons/bs";

const NavLink = ({
  href,
  label,
  onClick,
  showCatMenu,
  catMenuComponent,
  className,
}) => {
  return (
    <div>
      <Link
        href={href}
        onClick={onClick}
        className={`text-gray-200 block hover:bg-gray-600 lg:hover:bg-green-700 px-4 py-2 border-b lg:border-b-0 border-solid border-gray-600 hover:border-b-none mb-2 md:mb-4 lg:mb-0 relative ${className}`}
      >
        {/* Give space between label name and icon, if icon exist. */}
        {
          <div className="flex items-center justify-between">
            {" "}
            {label}
            {label === "Categories" && (
              <BsChevronDown
                size={14}
                className={`ml-1 ${
                  showCatMenu ? "rotate-180 duration-300" : null
                }`}
              />
            )}
          </div>
        }
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
