import React from "react";
import CartListView from "../CartComponents/CartListView";
import CheckoutSummary from "../CartComponents/CheckoutSummary";
import UserDetails from "./UserDetails";
import { useSelector } from "react-redux";
import CartTopBar from "../CartComponents/CartTopBar";

const CompleteOrder = () => {
  const { selectedItems } = useSelector((state) => state.BuyProduct);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full">
      <div className="w-full fixed top-15 z-10 bg-white shadow-md">
        <CartTopBar />
      </div>
      <div className="flex flex-col md:flex-row  w-full mt-24 mb-10 pl-[3vw] pr-[1vw]">
        <div className="w-full flex flex-col p-6 pl-4">
          <CartListView MyCart={selectedItems} />
          <div className="flex flex-col md:flex-row gap-3 mt-6 pl-5">
            <div className="w-full sm:w-1/2">
              <UserDetails />
            </div>
            <div className="w-full sm:w-1/2">
              <CheckoutSummary activeStep={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteOrder;
