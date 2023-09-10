import React from "react";
import Text from "./components/Text";
// import Layout from "./components/Layout";

const Home = () => {
  // Create an array with 15 elements
  const textComponents = Array.from({ length: 15 }, (_, index) => (
    <div
      key={index}
      // className="p-4 border border-gray-300 rounded-md shadow-md m-2"
    >
      <Text />
    </div>
  ));

  return (
    <div class="flex flex-wrap justify-center items-center  mt-[100px]">
      {textComponents}
    </div>
  );
};

export default Home;
