import React from "react";
import Button from "../UI/button/Button";
import CarouselComponent from "../shared/carousel-component/CarouselComponent";

const HeaderBody = () => {
  return (
    <header
      // This style is for full header-area body which is located below navbar
      class="bg-gray-700 w-full h-[22rem] mt-16 py-12 px-24"
    >
      {/* The heading of the header area - start */}
      <div>
        <div>
          <h1 class="text-gray-300 text-[2rem] text-left uppercase font-bold">
            All <span class="text-green-500">Branding</span>
          </h1>
          <h1 class="text-gray-200 text-[2rem] text-left uppercase font-bold">
            <span class="text-green-500">Shoes</span> Collection
          </h1>
        </div>
        {/* The heading of the header area - end */}

        {/* The paragraph of the header area */}
        <p class="text-gray-200 text-[1rem] text-left w-2/3 mt-3 mb-10 leading-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, veniam
          dolores harum aut a animi temporibus nostrum fugit? Pariatur non
          voluptate quasi voluptatum esse similique quam, ipsum numquam
          architecto accusantium voluptatibus placeat cum autem alias eum,
          maiores dolore!
        </p>

        {/* The buttons of the header area */}
        <div class="flex flex-wrap">
          <Button href="/about" label="About Us" />
          <Button href="/contact" label="Contact Us" />
        </div>
      </div>

      <div>
        <CarouselComponent />
      </div>
    </header>
  );
};

export default HeaderBody;
