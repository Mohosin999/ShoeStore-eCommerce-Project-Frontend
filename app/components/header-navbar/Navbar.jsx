"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// Icons
import { FcShop } from "react-icons/fc";
import { BsCartFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
// Components
import CategoryMenu from "../shared/cat-menu/CategoryMenu";
import NavLink from "../UI/nav-link/NavLink";

const Navbar = () => {
  const [isFixed, setIsFixed] = useState(true);
  const [showCatMenu, setShowCatMenu] = useState(false);

  // Listen to scroll events and update 'isFixed' accordingly.
  useEffect(() => {
    // Initialize 'prevScrollY' to keep track of previous scroll position.
    let prevScrollY = 0;

    // Define a function to handle scroll events.
    const handleScroll = () => {
      // Get the current scroll position.
      const currentScrollY = window.scrollY;

      // Check if the user has scrolled down and has scrolled past a certain threshold.
      if (currentScrollY > 200 && currentScrollY > prevScrollY) {
        setIsFixed(false); // Make the header not fixed.
      } else if (currentScrollY <= prevScrollY) {
        setIsFixed(true); // Make the header fixed when scrolling up.
      }

      // Update 'prevScrollY' with the current scroll position.
      prevScrollY = currentScrollY;
    };

    // Add a scroll event listener to the window.
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <nav
        class={`${
          isFixed ? "top-0" : "top-[-100px]"
        } text-gray-600 body-font fixed w-full bg-gray-700 z-50`}
      >
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          {/* Left section of the header - start */}
          <Link
            href="/"
            class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <FcShop size={32} /> {/* Shop icon */}
            <span class="text-gray-300 font-bold text-green-500 ml-3 text-xl hover:scale-105 duration-300">
              ShoeStore
            </span>{" "}
            {/* Company name */}
          </Link>
          {/* Left section of the header - end */}

          {/* Middle section of the header - start */}
          <div class="md:ml-auto md:mr-auto flex flex-wrap items-center justify-center text-base">
            <NavLink href="/" label="Home" />
            <NavLink href="/products" label="Products" />
            <NavLink
              href=""
              label="Categories"
              onMouseEnter={() => setShowCatMenu(true)}
              onMouseLeave={() => setShowCatMenu(false)}
              showSubMenu={showCatMenu}
              subMenuComponent={<CategoryMenu />}
            />
          </div>
          {/* Middle section of the header - end */}

          {/* Right section of the header - start */}
          <NavLink href="/login" label="Login" />
          <NavLink href="/register" label="Register" />
          {/* Favorite & Cart Icons */}
          <Link href="" class="text-gray-200 px-4 py-2">
            <MdFavorite size={22} />
          </Link>
          <Link href="" class="text-gray-200 px-4 py-2">
            <BsCartFill size={22} />
          </Link>
          {/* Right section of the header - end */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
