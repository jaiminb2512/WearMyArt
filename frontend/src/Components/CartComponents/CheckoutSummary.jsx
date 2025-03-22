import React from "react";
import { Button, TextField } from "@mui/material";
import MTooltip from "../MTooltip";
import { useSelector } from "react-redux";

const CheckoutSummary = ({ activeStep, setActiveStep }) => {
  const { TotalCost } = useSelector((state) => state.BuyProduct);
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full border">
      <div className="mb-4">
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Subtotal</span>
          <span className="font-medium">{TotalCost}</span>
        </div>
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Discount</span>
          <span className="font-medium">$0.0</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping Costs</span>
          <span className="font-medium">$50.00</span>
        </div>
      </div>

      {activeStep < 2 && (
        <div className="flex items-center gap-2 mb-4 justify-between">
          <TextField
            placeholder="Coupon code"
            variant="outlined"
            className="w-2/3 p-1"
          />
          <MTooltip title="Apply Coupon">
            <Button variant="contained" color="success" className="py-2">
              Apply Coupon
            </Button>
          </MTooltip>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {activeStep == 0 && (
          <MTooltip title="checkout">
            <Button
              variant="contained"
              fullWidth
              className="py-3 text-lg bg-gray-300 text-gray-600 cursor-not-allowed mb-4 w-full"
              onClick={() => setActiveStep(1)}
            >
              Checkout
            </Button>
          </MTooltip>
        )}
        {activeStep == 1 && (
          <MTooltip title="Back">
            <Button
              variant="contained"
              fullWidth
              className="py-3 text-lg bg-gray-300 text-gray-600 cursor-not-allowed mb-4 w-full"
              onClick={() => setActiveStep(activeStep - 1)}
            >
              Back
            </Button>
          </MTooltip>
        )}
        {activeStep == 1 && (
          <MTooltip title="Confirm Order">
            <Button
              variant="contained"
              fullWidth
              color="success"
              className="py-3 text-lg bg-gray-300 text-gray-600 cursor-not-allowed mb-4 w-full"
              onClick={() => setActiveStep(2)}
            >
              Confirm Order
            </Button>
          </MTooltip>
        )}
        {activeStep == 2 && (
          <MTooltip title="Finish">
            <Button
              variant="contained"
              fullWidth
              color="success"
              className="py-3 text-lg bg-gray-300 text-gray-600 cursor-not-allowed mb-4 w-full"
              onClick={() => setActiveStep(2)}
            >
              Finish
            </Button>
          </MTooltip>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
