import React from "react";
import {
  FaCcAmex,
  FaCcApplePay,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex gap-6 text-gray-700 flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center items-center md:justify-start md:items-start">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="text-green-500">🟢</span> WearMyArt
          </h2>
          <p className="mt-2">hello@wearmyart.io</p>
          <p className="font-semibold mt-1">+91 123 456 7890</p>
        </div>

        <div className="flex flex-2 justify-center items-center">
          <div className="flex-1 ">
            <h3 className="font-semibold text-lg mb-2">Information</h3>
            <ul className="space-y-2">
              <li>About us</li>
              <li>Our Blog</li>
              <li>Start a Return</li>
              <li>Contact Us</li>
              <li>Shipping FAQ</li>
            </ul>
          </div>

          <div className="flex-1 ">
            <h3 className="font-semibold text-lg mb-2">Useful links</h3>
            <ul className="space-y-2">
              <li>My Account</li>
              <li>Print Provider</li>
              <li>Become a Partner</li>
              <li>Custom Products</li>
              <li>Make your own shirt</li>
            </ul>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center md:justify-start md:items-start">
          <h3 className="font-semibold text-lg mb-2">Newsletter</h3>
          <p className="mb-3">
            Get the latest news, events & more delivered to your inbox.
          </p>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 outline-none"
            />
            <button className="bg-gray-800 text-white px-4 py-2">→</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
        <div className="flex space-x-3 text-2xl">
          <FaCcAmex />
          <FaCcApplePay />
          <FaCcMastercard />
          <FaCcPaypal />
          <FaCcVisa />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
