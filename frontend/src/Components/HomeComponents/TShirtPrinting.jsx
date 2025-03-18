import React from "react";
import HeroImage from "/img/Image 4.png";
import LaptopImage from "/img/Laptop.png";

const TShirtPrinting = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-[10vw]">
      <div className="flex items-center flex-col sm:flex-row">
        <img
          src={HeroImage}
          alt="Hero Design"
          className="mb-6 sm:w-1/2 w-full"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4 flex flex-col w-[fit-content] ">
            <p>Free and easy way to</p>
            <p>bring your ideas to life</p>
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

        <div className="flex">
          <div className="flex flex-col md:justify-center gap-8">
            <div className="bg-white shadow-lg p-6 rounded-lg w-80">
              <h3 className="font-bold mb-2">Easy to Create & Customize</h3>
              <p className="text-gray-500">
                Use our powerful editor to design t-shirts that match your
                vision.
              </p>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg w-80">
              <h3 className="font-bold mb-2">Thousands of Free Templates</h3>
              <p className="text-gray-500">
                Choose from a wide range of professionally designed templates.
              </p>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg w-80">
              <h3 className="font-bold mb-2">Free Standard Shipping</h3>
              <p className="text-gray-500">
                Get your custom t-shirts delivered to your doorstep at no extra
                cost.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <img
              src={LaptopImage}
              alt="Laptop Design"
              className="mb-6 w-[50vw]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TShirtPrinting;
