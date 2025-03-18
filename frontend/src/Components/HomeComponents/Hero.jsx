import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 md:flex-row items-center justify-center min-h-screen bg-gradient-to-b from-[#C5F1E1] to-white p-8 overflow-clip">
      <div className="flex flex-col items-start justify-center ">
        <div className="bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          Create your own
        </div>
        <h1 className="text-xl sm:text-5xl font-bold text-gray-900 leading-tight relative">
          Make the most <br /> of{" "}
          <span className="relative inline-block">
            printing
            <svg
              className="absolute left-0 bottom-0 w-full"
              viewBox="0 0 220 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 15 C 50 25, 170 -5, 215 10"
                stroke="#22c55e"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <p className="text-gray-600 mt-4 text-md sm:text-lg max-w-xl">
          What’s more, we do it right! A full administration printing
          background. Print shirts for yourself or your online business.
        </p>
        <div className="mt-6 flex gap-4">
          <Button
            className="px-6 py-3 text-lg font-medium flex items-center gap-2 shadow-md hover:bg-green-600 transition rounded-4xl"
            variant="contained"
            color="success"
            onClick={() => navigate("/products")}
          >
            Shop Now →
          </Button>
        </div>

        <div className="mt-10 flex gap-12 text-gray-900 font-semibold text-2xl">
          <div>
            <span className="block text-xl sm:text-4xl">4k+</span>
            <span className="text-gray-600 text-lg">Collections</span>
          </div>
          <div>
            <span className="block text-xl sm:text-4xl">9k+</span>
            <span className="text-gray-600 text-sm sm:text-lg">
              items trusted to deliver
            </span>
          </div>
        </div>
      </div>
      <div className="md:w-2/3 flex justify-center rotate-24 overflow-hidden">
        <img
          src="/img/Tshirt Group.png"
          alt="T-Shirt Designs"
          className="max-w-full h-full"
        />
      </div>
    </div>
  );
};

export default Hero;
