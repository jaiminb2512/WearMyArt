import React from "react";
import { Button, TextField } from "@mui/material";
import MTooltip from "../MTooltip";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MTooltipButton from "../MTooltipButton";
import {
  resetBuyProductSlice,
  setActiveStep,
} from "../../Redux/BuyProductSlice";
import { useApiMutation } from "../../utils/apiRequest";
import ApiURLS from "../../Data/ApiURLS";
import axios from "axios";
import { showToast } from "../../Redux/ToastSlice";
import { clearProductData } from "../../Redux/tempProductSlice";

const CheckoutSummary = () => {
  const { TotalCost, activeStep, selectedItems, Products, buyNow } =
    useSelector((state) => state.BuyProduct);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckOut = () => {
    navigate("/dashboard/checkout");
    dispatch(setActiveStep(1));
  };

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
    navigate(-1);
  };

  const handleConfirmOrder = () => {
    dispatch(setActiveStep(activeStep + 1));
    navigate("/dashboard/complete-order");
  };

  const { mutateAsync: cartToOrderMutation } = useApiMutation(
    ApiURLS.CartToOrder.url,
    ApiURLS.CartToOrder.method
  );

  const cleanData = () => {
    dispatch(clearProductData());
    dispatch(resetBuyProductSlice());
  };

  const cartToOrder = async () => {
    const orderKeys =
      selectedItems.length > 0
        ? selectedItems.map((item) => item.key)
        : Products.map((item) => item.key);
    await cartToOrderMutation({ orderKeys });

    navigate("/dashboard/order-success");
    dispatch(setActiveStep(activeStep + 1));
  };

  const addOrder = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}${ApiURLS.AddOrder.url}`,
        Products[0].orderData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(
          showToast({
            message: response.data.message || "Product added successfully",
            variant: "success",
          })
        );
        cleanData();
        navigate("/dashboard/order-success");
      } else {
        dispatch(
          showToast({
            message: response.data.message || "Failed Place Order",
            variant: "error",
          })
        );
      }
    } catch (error) {
      console.error("Error placing Order:", error.message);
      dispatch(
        showToast({
          message: error?.response?.data?.message || "Some error occurred",
          variant: "error",
        })
      );
    }
  };

  const handlePayAmount = async () => {
    if (buyNow) {
      addOrder();
      cleanData();
    } else {
      cartToOrder();
      cleanData();
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
            title="Pay Amount"
            variant="contained"
            fullWidth
            color="success"
            className="py-3 text-lg bg-gray-300 text-gray-600 cursor-not-allowed mb-4"
            onClick={() => handlePayAmount()}
          >
            Pay Amount
          </MTooltipButton>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
