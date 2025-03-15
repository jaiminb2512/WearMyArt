import React from "react";
import { useSelector } from "react-redux";

const ConfirmOrder = () => {
  const tempProduct = useSelector((state) => state.tempProduct);

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h1 className="text-2xl font-bold">Review Your Design</h1>

      {tempProduct.FinalProductImg ? (
        <div className="flex gap-3">
          <img
            src={tempProduct.FinalProductImg}
            alt="Final Design"
            className="w-[300px] h-[300px] object-cover rounded-md shadow-md"
          />
          {tempProduct.CustomerImg && (
            <img
              src={tempProduct.CustomerImg}
              alt="Customer Image"
              className="w-[300px] h-[300px] object-cover rounded-md shadow-md"
            />
          )}
        </div>
      ) : (
        <div className="w-[300px] h-[300px] bg-gray-200 flex items-center justify-center rounded-md shadow-md">
          <p>No design available</p>
        </div>
      )}

      <p className="mt-4 text-lg">Quantity: {tempProduct.Quantity}</p>

      <p className="text-lg">Total Cost: ₹{tempProduct.FinalCost}</p>
    </div>
  );
};

export default ConfirmOrder;
