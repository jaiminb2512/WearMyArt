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
    <footer className="bg-gray-100 py-8 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-700">
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-green-500">🟢</span> WearMyArt
            </h2>
            <p className="mt-2">hello@wearmyart.io</p>
            <p className="font-semibold mt-1">+91 123 456 7890</p>

            <div className="flex space-x-3 text-2xl mt-4 sm:hidden">
              <FaCcAmex />
              <FaCcApplePay />
              <FaCcMastercard />
              <FaCcPaypal />
              <FaCcVisa />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 text-center sm:text-left">
              Information
            </h3>
            <ul className="space-y-2">
              <li className="hover:text-green-600 cursor-pointer text-center sm:text-left">
                About us
              </li>
              <li className="hover:text-green-600 cursor-pointer text-center sm:text-left">
                Our Blog
              </li>
              <li className="hover:text-green-600 cursor-pointer text-center sm:text-left">
                Start a Return
              </li>
              <li className="hover:text-green-600 cursor-pointer text-center sm:text-left">
                Contact Us
              </li>
              <li className="hover:text-green-600 cursor-pointer text-center sm:text-left">
                Shipping FAQ
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 text-center sm:text-left">
              Useful links
            </h3>
            <ul className="space-y-2">
              <li className="hover:text-green-600 cursor-pointer text-center sm:text-left">
                My Account
              </li>
              <li className="hover:text-green-600 cursor-pointer text-center sm:text-left">
                Print Provider
              </li>
              <li className="hover:text-green-600 cursor-pointer text-center sm:text-left">
                Become a Partner
              </li>
              <li className="hover:text-green-600 cursor-pointer text-center sm:text-left">
                Custom Products
              </li>
              <li className="hover:text-green-600 cursor-pointer text-center sm:text-left">
                Make your own shirt
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-semibold text-lg mb-2">Newsletter</h3>
            <p className="mb-3 text-center sm:text-left">
              Get the latest news, events & more delivered to your inbox.
            </p>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full max-w-xs">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 outline-none w-full"
              />
              <button className="bg-gray-800 hover:bg-green-600 transition-colors text-white px-4 py-2">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center text-gray-600 text-sm gap-4">
            <p className="mt-4 sm:mt-0 text-center sm:text-left">
              © {new Date().getFullYear()} WearMyArt. All rights reserved.
            </p>

            <div className="hidden sm:flex space-x-3 text-2xl">
              <FaCcAmex className="hover:text-green-600 cursor-pointer" />
              <FaCcApplePay className="hover:text-green-600 cursor-pointer" />
              <FaCcMastercard className="hover:text-green-600 cursor-pointer" />
              <FaCcPaypal className="hover:text-green-600 cursor-pointer" />
              <FaCcVisa className="hover:text-green-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
