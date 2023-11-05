import React from "react";
// Components
import Wrapper from "../wrapper";
import Title from "../UI/title";
import TestimonialCard from "./TestimonialCard";
// Import Images
import A1 from "../../../public/shoe1.jpg";
import A2 from "../../../public/shoe2.jpg";
import A3 from "../../../public/shoe3.jpg";
import A4 from "../../../public/shoe4.jpg";

/**
 * Testimonial section component.
 * @returns {JSX.Element}
 */
const TestimonialSection = () => {
  return (
    <Wrapper>
      {/* Section title */}
      <Title title="Some Testimonials" className="mt-8" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TestimonialCard
          img={A1}
          name="Mohosin Hasan Akash"
          comment="Wow! This is a great shoe, I am very happy to buy it. Wow! This is a
            great shoe, I am very happy to buy it."
        />

        <TestimonialCard
          img={A2}
          name="Md. Rasel Mondol"
          comment="Wow! This is a great shoe, I am very happy to buy it. Wow! This is a
            great shoe, I am very happy to buy it."
        />

        <TestimonialCard
          img={A3}
          name="Al Nayem Khan"
          comment="Wow! This is a great shoe, I am very happy to buy it. Wow! This is a
            great shoe, I am very happy to buy it."
        />

        <TestimonialCard
          img={A4}
          name="Shafiul Alam"
          comment="Wow! This is a great shoe, I am very happy to buy it. Wow! This is a
            great shoe, I am very happy to buy it."
        />
      </div>
    </Wrapper>
  );
};

export default TestimonialSection;
