import Link from "next/link";
import React from "react";
import PropTypes from "prop-types";

/**
 * A component that displays a category menu.
 *
 * @param {boolean} setShowCatMenu - A function to control the visibility of the category menu.
 * @param {Object} categoryData - It will be an object.
 */
const CategoryMenu = ({
  setShowCatMenu,
  categoryData,
  setIsMobileMenuOpen,
}) => {
  return (
    <ul className="mt-3 min-w-[250px] px-1 shadow-lg absolute ml-24 md:ml-40 lg:ml-0 z-40">
      {/* Map the category data object. */}
      {categoryData?.data?.map((item) => (
        <Link
          key={item.id}
          href={`/category/${item.attributes.slug}`}
          onClick={() => {
            setShowCatMenu(false);
            setIsMobileMenuOpen(false);
          }}
          className="flex justify-between items-center bg-green-700 hover:bg-gray-600"
        >
          <li className="w-full h-12 flex justify between items-center px-3">
            {/* Category's title */}
            {item.attributes.title}
            {/* Items amount of category */}
            <span className="ml-auto">
              {item?.attributes?.products?.data?.length}
            </span>
          </li>
        </Link>
      ))}
    </ul>
  );
};

CategoryMenu.propTypes = {
  setShowCatMenu: PropTypes.func.isRequired,
  categoryData: PropTypes.object.isRequired,
};

export default CategoryMenu;

// import Link from "next/link";
// import React from "react";
// import PropTypes from "prop-types";

// /**
//  * A component that displays a category menu.
//  *
//  * @param {boolean} setShowCatMenu - A function to control the visibility of the category menu.
//  * @param {Object} categoryData - It will be an object.
//  */
// const CategoryMenu = ({ setShowCatMenu, categoryData }) => {
//   return (
//     <ul className="mt-4 min-w-[250px] px-1 shadow-lg">
//       {/* Map the category data object. */}
//       {categoryData?.data?.map((item) => (
//         <Link
//           key={item.id}
//           href={`/category/${item.attributes.slug}`}
//           onClick={() => setShowCatMenu(false)}
//           className="flex justify-between items-center bg-green-700 hover:bg-gray-700"
//         >
//           <li className="w-full h-12 flex justify between items-center px-3">
//             {/* Category's title */}
//             {item.attributes.title}
//             {/* Items amount of category */}
//             <span className="ml-auto">
//               {item?.attributes?.products?.data?.length}
//             </span>
//           </li>
//         </Link>
//       ))}
//     </ul>
//   );
// };

// CategoryMenu.propTypes = {
//   setShowCatMenu: PropTypes.func.isRequired,
//   categoryData: PropTypes.object.isRequired,
// };

// export default CategoryMenu;
