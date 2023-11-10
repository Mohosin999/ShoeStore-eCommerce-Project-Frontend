import React from "react";
import Image from "next/image";
// Components
import bannerImage from "../../../public/watch.jpg";
import Wrapper from "../wrapper";
import Button from "../UI/button";

/**
 * Banner component
 * @returns {JSX.Element}
 */
const Banner = () => {
  return (
    <Wrapper>
      <div className="bg-gradient-to-r from-black via-blue-600 to-emerald-900 mt-8">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center">
          {/* Banner Image */}
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <Image
              src={bannerImage}
              width={500}
              alt="Banner Image"
              className="w-full h-48 object-cover"
            />
          </div>

          {/* Banner other informations - start */}
          <div className="flex-grow p-4 text-white">
            <div className="text-center">
              {/* Banner title */}
              <h1 className="text-xl lg:text-2xl font-semibold mb-2">
                New Released Watch
              </h1>
              {/* Banner paragraph */}
              <p className="text-sm text-gray-200">
                Discover the New Release Watch today and witness the evolution
                of horology in the palm of your hand. Time has never looked this
                good. Happy Shopping!
              </p>
            </div>
            {/* Banner button */}
            <div className="text-center pt-5">
              <Button
                href="https://www.shopz.com.bd/product-category/watches-accessories/"
                target={"_blank"}
                label="Shop Now"
              />
            </div>
          </div>
          {/* Banner other informations - end */}
        </div>
      </div>
    </Wrapper>
  );
};

export default Banner;

// import React from "react";
// import Image from "next/image";
// // Components
// import bannerImage from "../../../public/watch.jpg";
// import Wrapper from "../wrapper";
// import Button from "../UI/button";

// /**
//  * Banner component
//  * @returns {JSX.Element}
//  */
// const Banner = () => {
//   return (
//     <Wrapper>
//       <div className="bg-gradient-to-r from-black via-blue-600 to-emerald-900 mt-8">
//         <div className="max-w-screen-xl mx-auto flex flex-col items-center">
//           {/* Banner Image */}
//           <div className="flex-shrink-0 w-1/2">
//             <Image
//               src={bannerImage}
//               width={500}
//               alt="Banner Image"
//               className="w-full h-48 object-cover"
//             />
//           </div>

//           {/* Banner other informations - start */}
//           <div className="flex-grow p-4 text-white">
//             <div className="text-center">
//               {/* Banner title */}
//               <h1 className="text-2xl font-semibold mb-2">
//                 New Released Watch
//               </h1>
//               {/* Banner paragraph */}
//               <p className="text-gray-200">
//                 Discover the New Release Watch today and witness the evolution
//                 of horology in the palm of your hand. Time has never looked this
//                 good. Happy Shopping!
//               </p>
//             </div>
//             {/* Banner button */}
//             <div className="text-center pt-5">
//               <Button
//                 href="https://www.shopz.com.bd/product-category/watches-accessories/"
//                 target={"_blank"}
//                 label="Shop Now"
//               />
//             </div>
//           </div>
//           {/* Banner other informations - end */}
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default Banner;
