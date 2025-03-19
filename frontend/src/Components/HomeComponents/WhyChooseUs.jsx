import React from "react";
import { WhyChooseUsData } from "../../Data/Content";

const WhyChooseUs = () => {
  return (
    <section className="py-12 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto grid xl:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col justify-center items-center md:justify-start md:items-start mx-[5vw] md:mx-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why customize products with WearMyArt?
          </h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum det, cowce tetur duis negci det, consect eturlagiak
            adipiscing eliet duis negci det, con
          </p>
          <button className="bg-green-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-green-700 transition">
            View All Features →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {WhyChooseUsData.map((feature) => (
            <div
              key={feature.id}
              className="bg-white shadow-lg p-6 rounded-xl flex sm:flex-col items-start space-x-4"
            >
              <div className="p-3 bg-green-100 rounded-full">
                <feature.icon
                  size={feature.size}
                  className={`text-${feature.TextColor}`}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
