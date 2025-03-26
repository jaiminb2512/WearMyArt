import React from "react";
import CartListView from "../CartComponents/CartListView";
import CheckoutSummary from "../CartComponents/CheckoutSummary";
import UserDetails from "./UserDetails";
import CartTopBar from "../CartComponents/CartTopBar";

const CompleteOrder = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full">
      <div className="w-full fixed top-15 z-10 bg-white shadow-md">
        <CartTopBar />
      </div>
      <div className="flex flex-col md:flex-row  w-full mt-24 mb-10 pl-[3vw] pr-[1vw]">
        <div className="w-full flex flex-col p-6 pl-4">
          <CartListView />
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

// [
//   {
//     key: "order:67b302978648f9218f4f3a88:1742978030486",
//     orderData: {
//       ProductId: "67c0082f61eb61ba3e8ce0f7",
//       CustomerId: "67b302978648f9218f4f3a88",
//       Font: "React",
//       TextStyle: '["Bold","Italic"]',
//       Text: "WearMyArt",
//       Color: "#000000",
//       Quantity: "1",
//       FinalCost: "530",
//       FinalProductImg: "/uploads/FinalProductImg-1742978030454-587261545.png",
//       CustomizedType: "Text",
//     },
//   },
// ];

// [
//   {
//     ProductId: "67c0082f61eb61ba3e8ce0f7",
//     Quantity: "1",
//     FinalCost: "510",
//     CustomizedType: "Text",
//     Font: "Arial",
//     TextStyle: '["Bold","Italic"]',
//     Text: "WearMyArt",
//     Color: "#000000",
//     FinalProductImg: {},
//   },
// ];
