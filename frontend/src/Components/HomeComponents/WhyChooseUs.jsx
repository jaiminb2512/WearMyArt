import React from "react";
import {
  FaPrint,
  FaCreditCard,
  FaRulerCombined,
  FaTruck,
  FaBoxes,
  FaFileInvoice,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "No Die & Plate Charges",
    icon: <FaFileInvoice size={28} className="text-green-600" />,
    description:
      "We offer free die and plate making, reducing setup costs for custom printing.",
  },
  {
    id: 2,
    title: "High-Quality Offset Printing",
    icon: <FaPrint size={28} className="text-green-600" />,
    description:
      "Get crisp, vibrant, and long-lasting prints with our premium offset printing technology.",
  },
  {
    id: 3,
    title: "Secure Payment Options",
    icon: <FaCreditCard size={28} className="text-green-600" />,
    description:
      "We provide multiple secure payment methods to ensure a safe and smooth transaction.",
  },
  {
    id: 4,
    title: "Custom Sizes & Styles",
    icon: <FaRulerCombined size={28} className="text-green-600" />,
    description:
      "Create unique products with fully customizable sizes, styles, and materials.",
  },
  {
    id: 5,
    title: "Fast & Free Delivery",
    icon: <FaTruck size={28} className="text-green-600" />,
    description:
      "Enjoy fast and free shipping on all orders, ensuring your products arrive on time.",
  },
  {
    id: 6,
    title: "Low Minimum Order Quantity",
    icon: <FaBoxes size={28} className="text-green-600" />,
    description:
      "Order as few as you need, perfect for small businesses, startups, and personal projects.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Text Section */}
        <div>
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white shadow-lg p-6 rounded-xl flex sm:flex-col items-start space-x-4"
            >
              <div className="p-3 bg-green-100 rounded-full">
                {feature.icon}
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
