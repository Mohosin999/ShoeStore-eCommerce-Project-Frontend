import React from "react";
import { FcShop } from "react-icons/fc";
import ThemeSwitcher from "./theme-switcher/ThemeSwitcher";

const Header = () => {
  return (
    <div>
      <header class="text-gray-600 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          {/* Left section of header */}
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <FcShop size={32} /> {/* Shop icon */}
            <span class="ml-3 text-xl">ShoeStore</span> {/* Company name */}
          </a>
          {/* Middle section of header */}
          <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <a class="mr-5 hover:text-gray-900">First Link</a>
            <a class="mr-5 hover:text-gray-900">Second Link</a>
            <a class="mr-5 hover:text-gray-900">Third Link</a>
            <a class="mr-5 hover:text-gray-900">Fourth Link</a>
          </nav>
          {/* Right section of header */}
          <ThemeSwitcher /> {/* Theme changer button */}
        </div>
      </header>
    </div>
  );
};

export default Header;
