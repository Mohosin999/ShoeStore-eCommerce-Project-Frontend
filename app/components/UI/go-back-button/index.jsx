import React from "react";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="ml-1 hover:underline underline-offset-2 text-gray-200 font-normal text-xs md:text-sm text-center "
    >
      Go Back
    </button>
  );
};

export default GoBackButton;
