"use client";
// import React from "react";
// import Image from "next/image";

// import Layout from "./Layout";
import img from "../../public/img.jpg";

// const Text = () => {
//   return (
//     // <Layout>
//     <div class="max-w-sm rounded overflow-hidden shadow-lg">
//       <Image src={img} alt="Image description" width={500} height={500} />
//     </div>
//     // </Layout>
//   );
// };

// export default Text;

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Text = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`max-w-sm rounded overflow-hidden shadow-lg relative `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image src={img} alt="Image description" width={500} height={500} />

      {isHovered && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 text-white text-center backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-2">Product Name</h2>
          <p className="text-lg">$50.00</p>
          <Link href="/welcome">Buy Now</Link>
        </div>
      )}
    </div>
  );
};

export default Text;
