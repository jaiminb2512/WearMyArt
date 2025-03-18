import React from "react";

const testimonials = [
  {
    name: "Dean D.",
    role: "Director",
    image: "https://via.placeholder.com/50",
    text: "Great quality products - Flags, programs for exceptional capacities, birthday, and occasion welcome are largely still mainstream on paper.",
  },
  {
    name: "Cristian L.",
    role: "Manager",
    image: "https://via.placeholder.com/50",
    text: "Best services ever - Flags, programs for exceptional capacities, birthday, and are largely still mainstream on paper occasion welcome.",
  },
  {
    name: "Leonel R.",
    role: "Designer",
    image: "https://via.placeholder.com/50",
    text: "Top notch support - Flags, programs for, birthday, and occasion welcome are largely still mainstream on paper exceptional capacities.",
  },
];

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
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 shadow-2xl rounded-2xl border flex flex-col items-center"
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
