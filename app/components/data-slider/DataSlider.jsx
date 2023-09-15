"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SlideNavButton from "./SlideNavButton";
import Wrapper from "../wrapper/Wrapper";
import ProductCard from "../product-card/ProductCard";

const DataSlider = ({ apiUrl }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get(apiUrl);
      const fetchedData = response.data;
      setData(fetchedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromBackend();
  }, [apiUrl]);

  return (
    <Wrapper className="mt-10">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={3}
          spaceBetween={15}
          breakpoints={{
            480: { slidesPerView: 1 },
            780: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
        >
          {(data?.filteredData || data?.data)?.map((item) => (
            <SwiperSlide key={item.id}>
              <ProductCard item={item} />
            </SwiperSlide>
          ))}
          <SlideNavButton />
        </Swiper>
      )}
    </Wrapper>
  );
};

DataSlider.propTypes = {
  apiUrl: PropTypes.string.isRequired, // Expect apiUrl to be a required string.
};

export default DataSlider;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import { Navigation, Pagination, A11y } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import NavSlideBtn from "./SlideNavButton";
// import Wrapper from "../wrapper/Wrapper";
// import ProductCard from "../product-card/ProductCard";

// // External Data Import
// const url = "http://127.0.0.1:1337/api/products/hot-discount?populate=*";

// const CustomSlider1 = () => {
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const getProductsFromBackend = async () => {
//     try {
//       const fetchData = await axios.get(url);
//       const products = fetchData.data;
//       setProducts(products);
//       setIsLoading(false); // Set loading to false once data is fetched
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setIsLoading(false); // Set loading to false in case of an error
//     }
//   };

//   useEffect(() => {
//     getProductsFromBackend();
//   }, []);

//   // Create individual hover states for each product
//   const [hoveredProduct, setHoveredProduct] = useState(null);

//   return (
//     <Wrapper className="mt-10">
//       {isLoading ? (
//         // Show loading indicator while data is being fetched
//         <p>Loading...</p>
//       ) : (
//         <Swiper
//           modules={[Navigation, Pagination, A11y]}
//           slidesPerView={3}
//           spaceBetween={15}
//           breakpoints={{
//             480: { slidesPerView: 1 },
//             780: { slidesPerView: 2 },
//             1280: { slidesPerView: 3 },
//           }}
//         >
//           {products?.filteredData &&
//             products?.filteredData.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <ProductCard item={item} />
//               </SwiperSlide>
//             ))}
//           <NavSlideBtn />
//         </Swiper>
//       )}
//     </Wrapper>
//   );
// };

// export default CustomSlider1;
