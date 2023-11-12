"use client";
import React from "react";
import Wrapper from "./components/wrapper";
import Button from "./components/UI/button";

const NotFound = () => {
  return (
    <Wrapper>
      <div className="w-full mt-32">
        <h1 className=" text-center text-2xl md:text-3xl lg:text-4xl text-gray-200">
          404 - page not found! 😿
        </h1>

        {/* Go back button */}
        <div className="mt-4 lg:mt-8 text-center">
          <Button href="/" label="Go to Home" />
        </div>
      </div>
    </Wrapper>
  );
};

export default NotFound;
