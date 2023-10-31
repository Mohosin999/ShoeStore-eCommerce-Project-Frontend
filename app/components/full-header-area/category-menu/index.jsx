import Link from "next/link";
import React from "react";

const CategoryMenu = ({ setShowCatMenu, categoryData }) => {
  return (
    <ul className="bg-gray-800/75 min-w-[250px] px-1 shadow-lg">
      {categoryData?.data?.map((item) => (
        <Link
          key={item.id}
          href={`/category/${item.attributes.slug}`}
          onClick={() => setShowCatMenu(false)}
          className="flex justify-between items-center"
        >
          <li className="w-full h-12 flex justify-between items-center px-3">
            {item.attributes.title}
            <span className="ml-auto">
              {item?.attributes?.products?.data?.length}
            </span>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default CategoryMenu;

// import Link from "next/link";
// import React from "react";

// const moreMenuData = [
//   { id: 1, name: "Sneakers", slug: "sneakers" },
//   { id: 2, name: "Running Shoes", slug: "running-shoes" },
//   { id: 3, name: "Football Shoes", slug: "football-shoes" },
// ];

// const CategoryMenu = ({ setShowCatMenu, categoryData }) => {
//   return (
//     <ul className="absolute w-[20rem]">
//       {moreMenuData.map(({ name, id }, index) => {
//         // Get last item
//         const isLastItem = index === moreMenuData.length - 1;

//         return (
//           <li key={id}>
//             {categoryData?.map((item) => (
//               <Link
//                 key={item.id} // Add a unique key for the Link element
//                 href={`/category/${item.attributes.slug}`}
//                 className={`flex items-center justify-between bg-green-700 hover:bg-gray-700 text-gray-200 p-3
//                 ${
//                   // If the item is the last, no border shown below it
//                   isLastItem
//                     ? ""
//                     : "border-b border-gray-400 hover:border-gray-600"
//                 }`}
//                 onClick={() => setShowCatMenu(false)}
//               >
//                 {item.attributes.title}
//                 <span>{item?.attributes?.products?.data?.length}</span>
//               </Link>
//             ))}
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// export default CategoryMenu;
