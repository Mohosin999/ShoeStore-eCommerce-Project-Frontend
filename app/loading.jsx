import React from "react";

const Loading = () => {
  return (
    <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-100 z-50">
      <div class="text-center text-white">
        <svg
          class="w-16 h-16 animate-spin text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx="50"
            cy="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            r="35"
            strokeDasharray="164.93361431346415 56.97787143782138"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;1"
              values="0 50 50;360 50 50"
            ></animateTransform>
          </circle>
        </svg>
        <p class="text-sky-400 text-2xl mt-3">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
