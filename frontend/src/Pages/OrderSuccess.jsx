import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CartTopBar from "../Components/CartComponents/CartTopBar";
import MTooltipButton from "../Components/MTooltipButton";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full ">
      <div className="w-full fixed top-15 z-10 bg-white shadow-md">
        <CartTopBar />
      </div>

      <div className="flex items-center justify-center h-full bg-gray-100 mt-24 h-full">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-xl">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-100 p-4 rounded-full">
              <ShoppingBasketIcon className="text-4xl" />
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
            <span className="hidden sm:block"> Back to Shopping</span>
          </MTooltipButton>
        </div>
      </div>
    </div>
  );
}
