import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { BsChevronDown } from "react-icons/bs";

const moreMenuData = [
  { id: 1, name: "Products", url: "/products" },
  { id: 2, name: "About Us", url: "" },
  { id: 3, name: "Contact Us", url: "" },
  { id: 4, name: "FAQs", url: "" },
];

const Menu = ({
  showCatMenu,
  setShowCatMenu,
  categories,
  moreMenu,
  setMoreMenu,
}) => {
  const { theme } = useTheme();

  return (
    <ul className={`hidden md:flex items-center gap-8 font-medium`}>
      <Link href="/" className="hover:underline underline-offset-8 ">
        Home
      </Link>
      {/* Categories menu design */}
      <li
        className="flex items-center gap-1 relative"
        onMouseEnter={() => setShowCatMenu(true)}
        onMouseLeave={() => setShowCatMenu(false)}
      >
        Categories
        {/* Render chevron icon */}
        <BsChevronDown size={14} />
        {/* Render subMenu if showCatMenu is true */}
        {showCatMenu && (
          <ul
            className={`${
              theme === "dark"
                ? "bg-gray-900 text-gray-100"
                : "bg-gray-100 text-gray-900"
            } absolute top-6 left-0 min-w-[250px] px-1 shadow-lg`}
          >
            {/* Map through categories and render them as Links */}
            {categories?.map(({ attributes: c, id }) => {
              return (
                <Link
                  key={id}
                  href={`/category/${c.slug}`}
                  className="flex justify-between items-center"
                  onClick={() => setShowCatMenu(false)}
                >
                  {/* Render category name */}
                  <li
                    className={`w-full h-12 flex justify-between items-center px-3 ${
                      theme === "dark"
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-300"
                    } rounded-md`}
                  >
                    {c.name}
                    {/* Render number of products in category */}
                    <span className="opacity-50 text-sm px-3">
                      {`(${c.products.data.length})`}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
      </li>

      {/* More menu design */}
      <li
        className="flex items-center gap-1 relative"
        onMouseEnter={() => setMoreMenu(true)}
        onMouseLeave={() => setMoreMenu(false)}
      >
        More
        {/* Render chevron icon */}
        <BsChevronDown size={14} />
        {/* Render moreMenu if moreMenuis true */}
        {moreMenu && (
          <ul
            className={`${
              theme === "dark"
                ? "bg-gray-900 text-gray-100"
                : "bg-gray-100 text-gray-900"
            } absolute top-6 left-0 min-w-[160px] px-1 shadow-lg`}
          >
            {/* Map through moreMenuData and render them as Links */}
            {moreMenuData.map(({ name, url, id }) => {
              return (
                <Link
                  key={id}
                  href={url || ""}
                  className="flex justify-between items-center"
                  onClick={() => {
                    // onClick && onClick();
                    setMoreMenu(false);
                  }}
                >
                  {/* Render menu item name */}
                  <li
                    className={` ${
                      theme === "dark"
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-300"
                    } w-full h-12 flex items-center px-3 hover:bg-black/[0.04] rounded-md`}
                  >
                    {name}
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
      </li>

      {/* Sign up or login option */}
      <Link href="/signup" className="hover:underline underline-offset-8 ">
        Sign Up
      </Link>
    </ul>
  );
};

export default Menu;

// import React from "react";
// import Link from "next/link";
// import { BsChevronDown } from "react-icons/bs";

// const data = [
//   { id: 1, name: "Home", url: "/" },
//   { id: 2, name: "Products", url: "/products" },
//   { id: 3, name: "Categories", subMenu: true },
//   { id: 4, name: "More", url: "/more" },
// ];

// const subMenuData = [
//   { id: 1, name: "Jordan", doc_count: 11 },
//   { id: 2, name: "Sneakers", doc_count: 8 },
//   { id: 3, name: "Running shoes", doc_count: 64 },
//   { id: 4, name: "Football shoes", doc_count: 107 },
// ];

// const Menu = ({ showCatMenu, setShowCatMenu, categories }) => {
//   return (
//     <ul className="hidden md:flex items-center gap-8 font-medium text-black">
//       {data.map((item) => {
//         return (
//           <React.Fragment key={item.id}>
//             {!!item?.subMenu ? (
//               <li
//                 className="cursor-pointer flex items-center gap-2 relative"
//                 onMouseEnter={() => setShowCatMenu(true)}
//                 onMouseLeave={() => setShowCatMenu(false)}
//               >
//                 {item.name}
//                 <BsChevronDown size={14} />
//                 {showCatMenu && (
//                   <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 shadow-lg">
//                     {categories?.map(({ attributes: c, id }) => {
//                       return (
//                         <Link
//                           key={id}
//                           href={`/category/${c.slug}`}
//                           className="flex justify-between items-center"
//                           onClick={() => setShowCatMenu(false)}
//                         >
//                           <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
//                             {c.name}
//                           </li>
//                           <span className="opacity-50 text-sm px-3">
//                             {`(${c.products.data.length})`}
//                           </span>
//                         </Link>
//                       );
//                     })}
//                   </ul>
//                 )}
//               </li>
//             ) : (
//               <li className="cursor-pointer">
//                 <Link href={item?.url}>{item.name}</Link>
//               </li>
//             )}
//           </React.Fragment>
//         );
//       })}
//     </ul>
//   );
// };

// export default Menu;
