import React from "react";
import { testimonialsData } from "../../Data/Content";

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          What People Are Saying
        </h2>
        <p className="text-gray-500 mt-2">
          We provide support for more than 15K+ Businesses.
        </p>
        <div className="mt-10 grid md:grid-cols-3 gap-6 mx-[5vw] xl:mx-0">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 shadow-2xl rounded-2xl border flex flex-col items-center hover:scale-110 hover:translate-y-2 transition-transform duration-300 ease-in-out"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <h3 className="font-semibold text-gray-900">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
              <p className="mt-4 text-gray-700 text-center">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
