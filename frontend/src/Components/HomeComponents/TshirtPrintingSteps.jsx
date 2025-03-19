import React from "react";
import { TshirtPrintingStepsData } from "../../Data/Content";

export default function TshirtPrintingSteps() {
  return (
    <div className="flex justify-center items-center min-h-[fit-content] py-16 ">
      <section className="text-center">
        <div className="max-w-4xl mx-auto">
          <span className="px-4 py-1 text-sm font-semibold rounded-full text-green-600 bg-green-100">
            How it works
          </span>
          <h2 className="mt-4 text-3xl font-bold">
            T-shirt printing made easy.
          </h2>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-12 mx-[5vw] xl:mx-0">
          {TshirtPrintingStepsData.map((step, index) => (
            <div key={index} className="text-center max-w-xs">
              <div className="flex items-center justify-center w-12 h-12 text-white bg-green-500 rounded-full text-lg font-bold mx-auto">
                {step.number}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
