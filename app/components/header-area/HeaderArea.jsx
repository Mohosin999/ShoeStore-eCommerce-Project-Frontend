import React from "react";
import Link from "next/link";

const HeaderArea = () => {
  return (
    <div class="bg-gray-700 w-full h-full mt-16 py-12 px-24">
      <div>
        <h1 class="text-gray-300 text-[2rem] text-left uppercase font-bold">
          All <span class="text-green-600">Branding</span>
        </h1>
        <h1 class="text-gray-300 text-[2rem] text-left uppercase font-bold">
          <span class="text-green-600">Shoes</span> Collection
        </h1>
      </div>
      <p class="text-gray-300 text-[1rem] text-left w-2/3 mt-3 mb-10 leading-7">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, veniam
        dolores harum aut a animi temporibus nostrum fugit? Pariatur non
        voluptate quasi voluptatum esse similique quam, ipsum numquam architecto
        accusantium voluptatibus placeat cum autem alias eum, maiores dolore!
      </p>

      <Link
        href="/contact"
        class="bg-orange-400 hover:bg-orange-500 px-6 py-3 rounded-full"
      >
        Contact Us
      </Link>
    </div>
  );
};

export default HeaderArea;
