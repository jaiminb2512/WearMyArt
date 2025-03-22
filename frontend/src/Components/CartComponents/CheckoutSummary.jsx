import React from "react";
import { Button, TextField } from "@mui/material";
import MTooltip from "../MTooltip";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MTooltipButton from "../MTooltipButton";
import { setActiveStep } from "../../Redux/BuyProductSlice";
import { useApiMutation, useFetchData } from "../../utils/apiRequest";
import ApiURLS from "../../Data/ApiURLS";

const CheckoutSummary = () => {
  const { TotalCost, activeStep, selectedItems, Products } = useSelector(
    (state) => state.BuyProduct
  );

  console.log("selectedItems", selectedItems);
  console.log("Products", Products);

  // let Items = selectedItems || Products;
  // if (selectedItems.length > 0) {
  //   Items = selectedItems;
  // } else {
  //   Items = Products;
  // }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckOut = () => {
    navigate("/dashboard/checkout");
    dispatch(setActiveStep(1));
  };

  const handleBack = () => {
    navigate(-1);
    dispatch(setActiveStep(activeStep - 1));
  };

  const handleConfirmOrder = () => {
    navigate("/dashboard/complete-order");
    dispatch(setActiveStep(activeStep + 1));
  };

  const { mutateAsync: cartToOrderMutation } = useApiMutation(
    ApiURLS.CartToOrder.url,
    ApiURLS.CartToOrder.method
  );

  const handleFinish = async () => {
    try {
      const orderKeys =
        selectedItems.length > 0
          ? selectedItems.map((item) => item.key)
          : Products.map((item) => item.key);
      console.log("keys", orderKeys);
      const response = await cartToOrderMutation({ keys: orderKeys });

      navigate("/dashboard/order-success");
    } catch (error) {
      console.error("Error in handleFinish:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full border">
      <div className="mb-4">
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Subtotal</span>
          <span className="font-medium">₹{TotalCost}</span>
        </div>
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Discount</span>
          <span className="font-medium">₹0.0</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping Costs</span>
          <span className="font-medium">₹50.00</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Payable Amount </span>
          <span className="font-medium">₹{TotalCost + 50.0}</span>
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
          <MTooltipButton
            title="checkout"
            variant="contained"
            fullWidth
            className="py-3 text-lg bg-gray-300
            text-gray-600 cursor-not-allowed mb-4"
            onClick={() => handleCheckOut()}
          >
            Checkout
          </MTooltipButton>
        )}
        {activeStep == 1 && (
          <div className="flex flex-wrap gap-3">
            <MTooltipButton
              title="Back"
              variant="contained"
              fullWidth
              className="py-3 text-lg bg-gray-300 text-gray-600 cursor-not-allowed mb-4"
              onClick={() => handleBack()}
            >
              Back
            </MTooltipButton>
            <MTooltipButton
              title="Confirm Order"
              variant="contained"
              fullWidth
              color="success"
              className="py-3 text-lg bg-gray-300 text-gray-600 cursor-not-allowed mb-4"
              onClick={() => handleConfirmOrder()}
            >
              Confirm Order
            </MTooltipButton>
          </div>
        )}
        {activeStep == 2 && (
          <MTooltipButton
            title="Finish"
            variant="contained"
            fullWidth
            color="success"
            className="py-3 text-lg bg-gray-300 text-gray-600 cursor-not-allowed mb-4"
            onClick={() => handleFinish()}
          >
            Finish
          </MTooltipButton>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
