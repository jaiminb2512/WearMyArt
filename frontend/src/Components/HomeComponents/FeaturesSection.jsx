import React from "react";
import { FeaturesData } from "../../Data/Content";

export default function FeaturesSection() {
  return (
    <section className="py-16 text-center flex flex-col gap-7 min-h-[fit-content] justify-center items-center">
      <p className="text-green-500 font-semibold uppercase text-sm">
        All the features you need
      </p>
      <h2 className="text-3xl font-bold mt-2">Fast and Quality Service</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-8 mt-8 max-w-5xl mx-[5vw] xl:mx-0 mb-10">
        {FeaturesData.map((service) => (
          <div key={service.id} className="flex flex-col items-center">
            <service.icon size={service.size} className={service.TextColor} />
            <h3 className="text-lg font-semibold mt-4">{service.title}</h3>
            <p className="text-gray-500 text-sm mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
