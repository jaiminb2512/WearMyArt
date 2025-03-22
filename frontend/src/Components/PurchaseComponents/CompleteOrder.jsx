import React from "react";
import CartListView from "../CartComponents/CartListView";
import CheckoutSummary from "../CartComponents/CheckoutSummary";
import UserDetails from "./UserDetails";

const CompleteOrder = ({ MyCart, isLoading }) => {
  return (
    <div className="w-full flex flex-col">
      <CartListView MyCart={MyCart} isLoading={isLoading} />
      <div className="flex flex-col md:flex-row gap-3 mt-6">
        <div className="w-full sm:w-1/2">
          <UserDetails />
        </div>
        <div className="w-full sm:w-1/2">
          <CheckoutSummary activeStep={2} />
        </div>
      </div>
    </div>
  );
};

export default CompleteOrder;
