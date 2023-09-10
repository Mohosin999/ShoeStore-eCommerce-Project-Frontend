"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FcShop } from "react-icons/fc";
import CategoryList from "../category-list/CategoryList";

const Header = () => {
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
      <header
        class={`${
          isFixed ? "top-0" : "top-[-100px]"
        } text-gray-600 body-font fixed w-full bg-gray-900 shadow-lg shadow-gray-700`}
      >
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          {/* Left section of header */}
          <Link
            href="/"
            class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <FcShop size={32} /> {/* Shop icon */}
            <span class="text-gray-300 ml-3 text-xl hover:scale-105 duration-300">
              ShoeStore
            </span>{" "}
            {/* Company name */}
          </Link>
          {/* Middle section of header */}
          <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href={"/"} class="mr-5  text-gray-300 hover:text-gray-400">
              Home
            </Link>
            <Link
              href={"/products"}
              class="mr-5  text-gray-300 hover:text-gray-400"
            >
              Products
            </Link>

            {/* Category Menu and it's sub menus - start */}
            <Link
              href={""}
              class="mr-5  text-gray-300 hover:text-gray-400 relative"
              onMouseEnter={() => setShowCatMenu(true)}
              onMouseLeave={() => setShowCatMenu(false)}
            >
              Categories
              {/* If showCatMenu state comes true, then show the CategoryList component */}
              {showCatMenu && (
                <CategoryList show={showCatMenu} setShow={setShowCatMenu} />
              )}
            </Link>
            {/* Category Menu and it's sub menus - end */}

            <Link
              href={"/contact"}
              class="mr-5  text-gray-300 hover:text-gray-400"
            >
              Contact us
            </Link>
          </nav>
          {/* Right section of header */}
        </div>
      </header>
    </div>
  );
};

export default Header;
