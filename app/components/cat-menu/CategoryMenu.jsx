import Link from "next/link";
import React from "react";

const moreMenuData = [
  { id: 1, name: "Sneakers", url: "" },
  { id: 2, name: "Running Shoes", url: "" },
  { id: 3, name: "Football Shoes", url: "" },
];

const CategoryMenu = ({ show, setShow }) => {
  return (
    <ul class="absolute w-[20rem]">
      {moreMenuData.map(({ name, url, id }, index) => {
        // Get last item
        const isLastItem = index === moreMenuData.length - 1;

        return (
          <li key={id}>
            {/* Render menu item name */}
            <Link
              href="/welcome"
              class={`flex items-center justify-between bg-green-700 hover:bg-gray-700 text-gray-200 p-3 
              ${
                // If item will last, no border shown below it
                isLastItem
                  ? ""
                  : "border-b border-gray-400 hover:border-gray-600"
              }`}
              onClick={() => setShow(!show)}
            >
              {name}
              <span>10</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryMenu;
