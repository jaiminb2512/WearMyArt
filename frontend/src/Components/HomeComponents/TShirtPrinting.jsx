import React from "react";
import HeroImage from "/img/Image 4.png";
import LaptopImage from "/img/Laptop.png";
import { TShirtPrintingData } from "../../Data/Content";

const TShirtPrinting = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-[10vw] overflow-x-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-center">
        <img
          src={HeroImage}
          alt="Hero Design"
          className="mb-6 sm:w-1/2 w-full max-w-full"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4">
            Free and easy way to bring your ideas to life
          </h1>
          <p className="text-gray-500 max-w-lg mb-6">
            Create stunning t-shirt designs with our easy-to-use tools.
            Customize your prints and enjoy high-quality results.
          </p>
          <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition">
            Get Started
          </button>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center text-center gap-2">
        <h2 className="text-3xl font-bold mb-4">T-shirt printing made easy.</h2>
        <p className="text-gray-500 max-w-md mb-8">
          High-quality prints, thousands of free templates, and free shipping
          make custom t-shirts effortless.
        </p>

        <div className="flex flex-col md:flex-row md:items-center w-full gap-8">
          <div className="flex flex-col gap-8 w-full md:w-1/2">
            {TShirtPrintingData.map((data, index) => (
              <div
                key={index}
                className="bg-white shadow-lg p-6 rounded-lg w-full "
              >
                <h3 className="font-bold mb-2">{data.title}</h3>
                <p className="text-gray-500">{data.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center md:w-1/2">
            <img
              src={LaptopImage}
              alt="Laptop Design"
              className="hidden md:block w-full max-w-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TShirtPrinting;
