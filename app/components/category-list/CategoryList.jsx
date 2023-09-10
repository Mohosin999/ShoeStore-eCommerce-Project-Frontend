import Link from "next/link";
import React from "react";

const moreMenuData = [
  { id: 1, name: "Sneakers", url: "" },
  { id: 2, name: "Running Shoes", url: "" },
  { id: 3, name: "Football Shoes", url: "" },
];

const CategoryList = ({ show, setShow }) => {
  return (
    <ul class="absolute w-[20rem]">
      {moreMenuData.map(({ name, url, id }) => {
        return (
          <Link
            key={id}
            href={url || ""}
            //   className="flex justify-between items-center"
            onClick={() => {
              // onClick && onClick();
              // setMoreMenu(false);
            }}
          >
            {/* Render menu item name */}
            <Link
              href="/welcome"
              class="flex items-center justify-between  bg-gray-500 hover:bg-gray-600 text-gray-300 p-3 border-b border-gray-400 hover:border-gray-600"
              onClick={() => setShow(!show)}
            >
              {name}
              <span>10</span>
            </Link>
          </Link>
        );
      })}
    </ul>
  );
};

export default CategoryList;
