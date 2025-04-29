import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import MTooltipButton from "../Components/MTooltipButton";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-[80vh] px-[2vw]">
      <div className="bg-gray-200 p-8 rounded-2xl shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-orange-100 p-4 rounded-full">
            <ShoppingBasketIcon className="text-7xl" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Thanks for your order!
        </h2>
        <p className="text-gray-600 mt-2">Thanks for placing order</p>
        <p className="text-gray-600">
          We will send you a notification within 2 days when it ships.
        </p>
        <div className="mt-4 text-gray-600 mb-5">
          Get in touch with us if you have any questions or concerns.
        </div>
        <MTooltipButton
          title="Back to Shopping"
          variant="contained"
          color="success"
          onClick={() => navigate("/products")}
          className="flex gap-2 justify-center items-center"
        >
          Back to Shopping
        </MTooltipButton>
      </div>
    </div>
  );
}
