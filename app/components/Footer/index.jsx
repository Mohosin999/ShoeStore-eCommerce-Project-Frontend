import React from "react";
import Wrapper from "../wrapper";

const Footer = () => {
  return (
    <Wrapper>
      <footer className="rounded-lg shadow m-4 mt-10">
        <div className="border-t border-gray-300">
          <div className="w-full mt-6 mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-base text-gray-500 sm:text-center">
              © 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                Flowbite™
              </a>
              . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-lg font-medium text-gray-500  sm:mt-0">
              <li>
                <a href="/about" className="mr-4 hover:underline md:mr-6 ">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Licensing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </Wrapper>
  );
};

export default Footer;
