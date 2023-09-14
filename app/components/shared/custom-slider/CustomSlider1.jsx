"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import NavSlideBtn from "./SlideNavButton";
import Link from "next/link";

// External Data Import
const url = "http://127.0.0.1:1337/api/products/hot-discount?populate=*";

const CustomSlider1 = () => {
  const [products, setProducts] = useState([]);

  const getProductsFromBackend = async () => {
    const fetchData = await axios.get(url);
    const products = fetchData.data;

    setProducts(products);
  };

  useEffect(() => {
    getProductsFromBackend();
  }, []);

  // Create individual hover states for each product
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <div className="mt-[5rem] px-10">
      <h1>Hot Discount!</h1>
      <br />

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={15}
        breakpoints={{
          480: { slidesPerView: 2 },
          780: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
        }}
      >
        {products?.filteredData &&
          products?.filteredData.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg relative border border-gray-700 m-2"
                onMouseEnter={() => setHoveredProduct(item.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Image
                  src={item.attributes.thumbnail.data.attributes.url}
                  width={400}
                  height={400}
                  alt={item.name}
                />

                {hoveredProduct === item.id && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 text-white text-center backdrop-blur-sm">
                    <h2 className="text-xl font-semibold mb-2">
                      {item.attributes.name}
                    </h2>
                    <p className="text-lg">
                      Original Price: ${item.attributes.original_price}
                    </p>
                    <p className="text-lg">
                      Discounted Price: ${item.attributes.discounted_price}
                    </p>
                    <Link href="/welcome">Buy Now</Link>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}

        <NavSlideBtn />
      </Swiper>
    </div>
  );
};

export default CustomSlider1;

// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Navigation, Pagination, A11y } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import Image from "next/image";
// import NavSlideBtn from "./SlideNavButton";
// import Link from "next/link";

// // External Data Import
// const url = "http://127.0.0.1:1337/api/products/hot-discount?populate=*";

// const CustomSlider1 = () => {
//   const [products, setProducts] = useState([]);
//   const [isHovered, setIsHovered] = useState(false);

//   const getProductsFromBackend = async () => {
//     const fetchData = await axios.get(url);
//     const products = fetchData.data;

//     setProducts(products);
//   };

//   useEffect(() => {
//     getProductsFromBackend();
//   }, []);

//   // const fetchData = await axios.get(url);
//   // const products = fetchData.data;

//   return (
//     <div class="mt-[5rem] px-10">
//       <h1>Hot Discount!</h1>
//       <br />

//       <Swiper
//         modules={[Navigation, Pagination, A11y]}
//         slidesPerView={1}
//         spaceBetween={15}
//         breakpoints={{
//           480: { slidesPerView: 2 },
//           780: { slidesPerView: 3 },
//           1280: { slidesPerView: 3 },
//         }}
//       >
//         {products?.filteredData &&
//           products?.filteredData.map((item) => (
//             <SwiperSlide
//               key={item.id}
//               // className="bg-red-200 !flex justify-center items-center "
//             >
//               <div class="max-w-sm rounded overflow-hidden shadow-lg relative border border-gray-700 m-2">
//                 <Image
//                   src={item.attributes.thumbnail.data.attributes.url}
//                   width={400}
//                   height={400}
//                   alt={item.name}
//                   // class="hover:bg-green-800 hover:opacity-20"
//                   onMouseEnter={() => setIsHovered(true)}
//                   onMouseLeave={() => setIsHovered(false)}
//                 />

//                 {isHovered && (
//                   <div class="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 text-white text-center backdrop-blur-sm">
//                     <h2 class="text-xl font-semibold mb-2">{item.name}</h2>
//                     <p class="text-lg">${item.original_price}</p>
//                     <p class="text-lg">${item.discounted_price}</p>
//                     <Link href="/welcome">Buy Now</Link>
//                   </div>
//                 )}
//               </div>
//             </SwiperSlide>
//           ))}

//         <NavSlideBtn />
//       </Swiper>
//     </div>
//   );
// };

// export default CustomSlider1;
