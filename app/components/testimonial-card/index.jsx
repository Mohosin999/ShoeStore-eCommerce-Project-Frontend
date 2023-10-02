import React from "react";
import A1 from "../../../public/shoe2.jpg";
import Image from "next/image";
import Wrapper from "../wrapper";
import Title from "../UI/title";

const TestimonialCard = () => {
  return (
    <Wrapper>
      <Title title="Some Testimonials" className="mt-8" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Testimonial Card */}
        <div
          class="w-full flex flex-wrap items-center
         bg-gray-800 shadow-md overflow-hidden"
        >
          <div class="md:flex items-center">
            <div class="md:flex-shrink-0 pl-4 w-1/3">
              <Image src={A1} width={500} alt="testimonial" />
            </div>
            <div class="p-3 md:p-8">
              <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Mohosin Hasan Akash
              </div>
              <p class="mt-2 text-gray-400">
                Wow! This is a great shoe, I am very happy to buy it. Wow! This
                is a great shoe, I am very happy to buy it.
              </p>
            </div>
          </div>
        </div>

        {/* Second Testimonial Card */}
        <div
          class="w-full flex flex-wrap items-center
         bg-gray-800 shadow-md overflow-hidden"
        >
          <div class="md:flex items-center">
            <div class="md:flex-shrink-0 pl-4 w-1/3">
              <Image src={A1} width={500} alt="testimonial" />
            </div>
            <div class="p-3 md:p-8">
              <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Mohosin Hasan Akash
              </div>
              <p class="mt-2 text-gray-400">
                Wow! This is a great shoe, I am very happy to buy it. Wow! This
                is a great shoe, I am very happy to buy it.
              </p>
            </div>
          </div>
        </div>

        {/* Third Testimonial Card */}
        <div
          class="w-full flex flex-wrap items-center
         bg-gray-800 shadow-md overflow-hidden"
        >
          <div class="md:flex items-center">
            <div class="md:flex-shrink-0 pl-4 w-1/3">
              <Image src={A1} width={500} alt="testimonial" />
            </div>
            <div class="p-3 md:p-8">
              <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Mohosin Hasan Akash
              </div>
              <p class="mt-2 text-gray-400">
                Wow! This is a great shoe, I am very happy to buy it. Wow! This
                is a great shoe, I am very happy to buy it.
              </p>
            </div>
          </div>
        </div>

        {/* Fourth Testimonial Card */}
        <div
          class="w-full flex flex-wrap items-center
         bg-gray-800 shadow-md overflow-hidden"
        >
          <div class="md:flex items-center">
            <div class="md:flex-shrink-0 pl-4 w-1/3">
              <Image src={A1} width={500} alt="testimonial" />
            </div>
            <div class="p-3 md:p-8">
              <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Mohosin Hasan Akash
              </div>
              <p class="mt-2 text-gray-400">
                Wow! This is a great shoe, I am very happy to buy it. Wow! This
                is a great shoe, I am very happy to buy it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default TestimonialCard;
