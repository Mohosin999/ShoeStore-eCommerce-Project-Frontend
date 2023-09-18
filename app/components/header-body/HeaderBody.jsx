import React from "react";
import ButtonLink from "../UI/button-link/ButtonLink";
import CarouselComponent from "../../components/carousel-component/CarouselComponent";

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
        <div class="relative flex flex-wrap">
          <ButtonLink href="/about" label="About Us" />
          <ButtonLink href="/contact" label="Contact Us" />

          {/* Button above the carousel component */}
          <div class="absolute ml-auto z-40 top-24 right-52">
            <ButtonLink href="/ps" label="Shop Now" className="bg-yellow-500" />
          </div>
        </div>
      </div>

      {/* Carousel component */}
      <CarouselComponent />
    </header>
  );
};

export default HeaderBody;
