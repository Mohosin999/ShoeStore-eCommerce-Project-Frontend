import React from "react";
import Link from "next/link";

const HeaderArea = () => {
  return (
    <div
      // This style is for full header-area body which is located below navbar
      class="bg-gray-700 w-full h-full mt-16 py-12 px-24"
    >
      {/* The heading of the header area - start */}
      <div>
        <h1 class="text-gray-300 text-[2rem] text-left uppercase font-bold">
          All <span class="text-green-600">Branding</span>
        </h1>
        <h1 class="text-gray-300 text-[2rem] text-left uppercase font-bold">
          <span class="text-green-600">Shoes</span> Collection
        </h1>
      </div>
      {/* The heading of the header area - end */}

      {/* The paragraph of the header area */}
      <p class="text-gray-300 text-[1rem] text-left w-2/3 mt-3 mb-10 leading-7">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, veniam
        dolores harum aut a animi temporibus nostrum fugit? Pariatur non
        voluptate quasi voluptatum esse similique quam, ipsum numquam architecto
        accusantium voluptatibus placeat cum autem alias eum, maiores dolore!
      </p>

      {/* The buttons of the header area */}
      <div>
        {/* About us button */}
        <Link
          href="/contact"
          class="bg-orange-400 hover:bg-orange-500 px-6 py-3 rounded-full mr-3"
        >
          About Us
        </Link>
        {/* Contact us button */}
        <Link
          href="/contact"
          class="bg-orange-400 hover:bg-orange-500 px-6 py-3 rounded-full"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default HeaderArea;
