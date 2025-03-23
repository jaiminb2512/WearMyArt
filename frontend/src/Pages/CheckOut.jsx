import React, { useEffect } from "react";
import CheckoutForm from "../Components/PurchaseComponents/CheckoutForm";
import CheckoutSummary from "../Components/CartComponents/CheckoutSummary";
import CartTopBar from "../Components/CartComponents/CartTopBar";
import { useDispatch } from "react-redux";
import { setActiveStep } from "../Redux/BuyProductSlice";

const CheckOut = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveStep(1));
  });
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full">
      <div className="w-full fixed top-15 z-10 bg-white shadow-md">
        <CartTopBar />
      </div>
      <div className="flex flex-col w-full gap-5 mt-24 mb-10 pl-[3vw] pr-[1vw]">
        <CheckoutForm />
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default CheckOut;
