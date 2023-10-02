import React from "react";
import Image from "next/image";
import bannerImage from "../../../public/watch.jpg";
import Wrapper from "../wrapper";
import ButtonLink from "../UI/button-link";

const BannerCard = () => {
  return (
    <Wrapper>
      <div className="bg-gradient-to-r from-black via-blue-600 to-emerald-900 mt-8">
        <div className="max-w-screen-xl mx-auto flex items-center">
          {/* Banner Image */}
          <div className="flex-shrink-0 w-1/2">
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
              <h1 className="text-2xl font-semibold mb-2">
                New Released Watch
              </h1>
              {/* Banner paragraph */}
              <p className="text-gray-200">
                Discover the New Release Watch today and witness the evolution
                of horology in the palm of your hand. Time has never looked this
                good. Happy Shopping!
              </p>
            </div>
            {/* Banner button */}
            <div class="text-center pt-5">
              <ButtonLink
                href="/"
                label="Shop Now"
                className="bg-orange-400 hover:bg-orange-500"
              />
            </div>
          </div>
          {/* Banner other informations - end */}
        </div>
      </div>
    </Wrapper>
  );
};

export default BannerCard;
