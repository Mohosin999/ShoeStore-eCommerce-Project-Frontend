"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useStoreState } from "easy-peasy";
// Icons
import { FcShop } from "react-icons/fc";
import { BsCart } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
// Components
import CategoryMenu from "../category-menu";
import NavLink from "../../UI/nav-link";
import { getJwtFromLocalCookie, unsetToken } from "@/app/lib/auth";

/**
 * Navbar component.
 *
 * @component
 * @returns {JSX.Element}
 */
const Navbar = () => {
  const [isFixed, setIsFixed] = useState(true);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Items from store.
  const { items } = useStoreState((state) => state.cartPortion);
  const { wishlistItems } = useStoreState((state) => state.wishlistPortion);

  const router = useRouter();
  // Current pathname
  const pathname = usePathname();

  // Hook for set "isLoggedIn" state's value.
  useEffect(() => {
    if (pathname === "/dashboard") {
      const token = getJwtFromLocalCookie();
      setIsLoggedIn(!!token);
    }
  }, [pathname]);

  // Logout function
  const handleLogout = () => {
    unsetToken(); // unsetToken for removing data from Cookies.
    setIsLoggedIn(false); // Update login status when user logs out
    router.push("/login");
  };

  // This hook is for hidden and showing the navbar at the time of scrolling.
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
        className={`${
          isFixed ? "top-0" : "top-[-100px]"
        } text-gray-600 body-font fixed w-full bg-gray-700 z-50`}
      >
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          {/* Left section of the navbar - start */}
          <Link
            href="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <FcShop size={32} /> {/* Shop icon */}
            <span className="text-gray-300 font-bold text-green-500 ml-3 text-xl hover:scale-105 duration-300">
              ShoeStore
            </span>{" "}
            {/* Company name */}
          </Link>
          {/* Left section of the navbar - end */}

          {/* Middle section of the navbar - start */}
          <div className="md:ml-auto md:mr-auto flex flex-wrap items-center justify-center text-base">
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
          {/* Middle section of the navbar - end */}

          {/* Right section of the navbar - start */}
          {isLoggedIn ? (
            // Display "Dashboard" and "Logout" links when logged in
            <>
              <NavLink href="/dashboard" label="Dashboard" />
              <NavLink href="/login" label="Logout" onClick={handleLogout} />
            </>
          ) : (
            // Display "Login" and "Register" links when not logged in
            <>
              <NavLink href="/login" label="Login" />
              <NavLink href="/register" label="Register" />
            </>
          )}

          {/* Favorite & Cart Icons */}
          {/* Wishlist icon start */}
          <Link href={"/wishlist"}>
            <div
              className={`w-8 md:w-12 h-8 md:h-12 rounded-full mr-4 flex justify-center items-center bg-green-600 hover:bg-green-700 cursor-pointer relative`}
            >
              <IoMdHeartEmpty className="text-gray-100 text-[19px] md:text-[24px] active:scale-95" />
              {wishlistItems.length > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-gray-100 text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {wishlistItems.length}
                </div>
              )}
            </div>
          </Link>
          {/* Wishlist icon end */}

          {/* Cart icon start */}
          <Link href={"/cart"}>
            <div
              className={`w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center bg-green-600 hover:bg-green-700 cursor-pointer relative`}
            >
              <BsCart className="text-gray-100 text-[15px] md:text-[20px] active:scale-95" />
              {items.length > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-gray-100 text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {items.length}
                </div>
              )}
            </div>
          </Link>
          {/* Cart icon end */}
          {/* Right section of the navbar - end */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
