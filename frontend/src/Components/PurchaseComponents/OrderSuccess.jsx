import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

export default function OrderSuccess({ OrderID = null }) {
  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-xl">
        <div className="flex justify-center mb-4">
          <div className="bg-orange-100 p-4 rounded-full">
            <ShoppingBasketIcon className="text-4xl" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Thanks for your order!
        </h2>
        <p className="text-gray-600 mt-2">
          Thanks for placing order{" "}
          <span className="text-green-500 font-medium">{OrderID}</span>
        </p>
        <p className="text-gray-600">
          We will send you a notification within 2 days when it ships.
        </p>
        <div className="mt-4 text-gray-600">
          Get in touch with us if you have any questions or concerns.
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-200 transition">
            Go back shopping
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Track order
          </button>
        </div>
      </div>
    </div>
  );
}
