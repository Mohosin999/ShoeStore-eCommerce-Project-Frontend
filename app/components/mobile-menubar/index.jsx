"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useStoreState } from "easy-peasy";
// Icons
import { BsCart } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
// Components
import CategoryMenu from "../navbar/CategoryMenu";
import NavLink from "../UI/nav-link";
// Functions
import { getJwtFromLocalCookie, unsetToken } from "@/app/lib/auth";
import { fetchedDataFromBackend } from "@/app/lib/utils";

/**
 * Navbar component
 * @returns {JSX.Element}
 */
const MobileNavbar = ({ handleMobileMenu, setIsMobileMenuOpen }) => {
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categoryData, setCategoryData] = useState(null);

  // Items from store.
  const { items } = useStoreState((state) => state.cartPortion);
  const { wishlistItems } = useStoreState((state) => state.wishlistPortion);

  const router = useRouter(); // Router
  const pathname = usePathname(); // Current pathname

  // If the user is loggedIn, update the "isLoggedIn" state with user's token.
  useEffect(() => {
    // if (pathname === "/dashboard") {
    // Get token from local cookies
    const token = getJwtFromLocalCookie();
    setIsLoggedIn(!!token); // !! makes the token result boolean.
    // }
  }, [pathname]);

  // Fetch the category data.
  useEffect(() => {
    const categoriesDataUrl = "http://127.0.0.1:1337/api/categories?populate=*";
    fetchedDataFromBackend(categoriesDataUrl, setCategoryData);
  }, []);

  // Logout function
  const handleLogout = () => {
    unsetToken(); // unsetToken for removing data from Cookies.
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="w-full min-h-screen z-30 fixed bg-fuchsia-900 rounded-lg backdrop-blur-md">
      {/*
       * ================================================================================
       * Cart and Wishlist icons.
       * ================================================================================
       */}
      <div className="flex items-center justify-end mt-4 px-6">
        {/* Favorite & Cart Icons */}
        {/* Wishlist icon start */}
        <Link href={"/wishlist"} onClick={handleMobileMenu}>
          <div
            className={`w-8 md:w-12 h-8 md:h-12 mr-4 rounded-full flex justify-center items-center bg-green-600 hover:bg-green-700 cursor-pointer relative`}
          >
            <IoMdHeartEmpty className="text-gray-100 text-[19px] md:text-[24px] active:scale-95" />
            {wishlistItems.length > 0 && (
              <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-gray-100 text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                {wishlistItems.length} {/* Show how much items in wishlist. */}
              </div>
            )}
          </div>
        </Link>
        {/* Wishlist icon end */}

        {/* Cart icon start */}
        <Link href={"/cart"} onClick={handleMobileMenu}>
          <div
            className={`w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center bg-green-600 hover:bg-green-700 cursor-pointer relative`}
          >
            <BsCart className="text-gray-100 text-[15px] md:text-[20px] active:scale-95" />
            {items.length > 0 && (
              <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-gray-100 text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                {items.length} {/* Show how much items in cart. */}
              </div>
            )}
          </div>
        </Link>
        {/* Cart icon end */}
      </div>

      {/*
       * ================================================================================
       * Menu link
       * ================================================================================
       */}
      <div className="flex items-center justify-between px-8 py-6">
        <div className="w-full flex flex-col font-medium">
          <NavLink href="/" label="Home" onClick={handleMobileMenu} />
          <NavLink
            href="/products"
            label="Products"
            onClick={handleMobileMenu}
          />
          {/* Category task related. */}
          <NavLink
            href=""
            label="Categories"
            onClick={() => setShowCatMenu(!showCatMenu)}
            showCatMenu={showCatMenu}
            catMenuComponent={
              // Component to show category's all menu.
              <CategoryMenu
                // Pass the component's state (boolean) show and hidden cat menu.
                setShowCatMenu={setShowCatMenu}
                // Pass the component's state with the category's data.
                categoryData={categoryData}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            }
          />
          {isLoggedIn ? (
            // Display "Dashboard" and "Logout" links when the user logged in.
            <>
              <NavLink
                href="/dashboard"
                label="Dashboard"
                onClick={handleMobileMenu}
              />
              <NavLink
                href="/login"
                label="Logout"
                onClick={() => {
                  handleLogout;
                  handleMobileMenu;
                }}
              />
            </>
          ) : (
            // Display "Login" and "Register" links when the user not logged in.
            <>
              <NavLink href="/login" label="Login" onClick={handleMobileMenu} />
              <NavLink
                href="/register"
                label="Register"
                onClick={handleMobileMenu}
              />
            </>
          )}
        </div>
      </div>

      {/* Right section of the navbar - end */}
    </nav>
  );
};

export default MobileNavbar;
