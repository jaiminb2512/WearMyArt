import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  ShoppingCart,
  CheckCircle,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import MTooltipButton from "../MTooltipButton";
import { useNavigate } from "react-router-dom";
import { addProducts, addTotalCost } from "../../Redux/BuyProductSlice";
import { useApiMutation } from "../../utils/apiRequest";
import ApiURLS from "../../Data/ApiURLS";
import axios from "axios";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tempProduct = useSelector((state) => state.tempProduct);
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const calculateSubTotal = () => {
    const TotalCost = (tempProduct.EditingCost + tempProduct.Price) * quantity;
    dispatch(addTotalCost(TotalCost));
    return TotalCost;
  };

  const totalCost = calculateSubTotal();
  console.log(totalCost);

  // const makeOrderData = () => {
  const makeOrderData = () => {
    const baseOrderData = {
      ProductId: tempProduct.ProductId,
      Quantity: quantity,
      FinalCost: tempProduct.EditingCost + tempProduct.Price,
      FinalProductImg: tempProduct.FinalProductImg,
      CustomizedType: tempProduct.CustomizeOption,
    };

    const textCustomizationData =
      tempProduct.CustomizeOption === "Text" ||
      tempProduct.CustomizeOption === "Both"
        ? {
            Font: tempProduct.Font,
            TextStyle: JSON.stringify(tempProduct.TextStyle),
            Text: tempProduct.Text,
            Color: tempProduct.Color,
          }
        : {};

    const imageCustomizationData =
      tempProduct.CustomizeOption === "Photo" ||
      tempProduct.CustomizeOption === "Both"
        ? {
            CustomerImg: tempProduct.CustomerImg,
          }
        : {};

    const completeOrderData = {
      orderData: {
        ...baseOrderData,
        ...textCustomizationData,
        ...imageCustomizationData,
      },
    };

    console.log("Order Data:", completeOrderData);
    return completeOrderData;
  };

  const handleCheckout = () => {
    const orderData = makeOrderData();
    dispatch(addProducts([orderData]));
    // navigate("/dashboard/checkout");
  };

  // ApiURLS.AddToCartOrder.url,
  // ApiURLS.AddToCartOrder.method;

  const handleAddToCart = async () => {
    const orderData = makeOrderData();
    console.log("Order Data:", orderData);

    const formData = new FormData();
    formData.append("ProductId", orderData.orderData.ProductId);
    formData.append("Quantity", orderData.orderData.Quantity);
    formData.append("FinalCost", orderData.orderData.FinalCost);
    formData.append("CustomizedType", orderData.orderData.CustomizedType);

    // Handle text customization fields
    if (orderData.orderData.Font)
      formData.append("Font", orderData.orderData.Font);
    if (orderData.orderData.TextStyle)
      formData.append("TextStyle", orderData.orderData.TextStyle);
    if (orderData.orderData.Text)
      formData.append("Text", orderData.orderData.Text);
    if (orderData.orderData.Color)
      formData.append("Color", orderData.orderData.Color);

    // Convert base64 FinalProductImg to a File
    if (tempProduct.FinalProductImg) {
      const blob = await (await fetch(tempProduct.FinalProductImg)).blob();
      const file = new File([blob], "finalProductImg.png", {
        type: "image/png",
      });
      formData.append("FinalProductImg", file);
    }

    // Handle CustomerImg if it exists
    if (tempProduct.CustomerImg) {
      if (tempProduct.CustomerImg instanceof File) {
        formData.append("CustomerImg", tempProduct.CustomerImg);
      } else {
        // If CustomerImg is a base64 string, convert it to a File
        const blob = await (await fetch(tempProduct.CustomerImg)).blob();
        const file = new File([blob], "customerImg.png", { type: "image/png" });
        formData.append("CustomerImg", file);
      }
    }

    try {
      const response = await axios({
        method: ApiURLS.AddToCartOrder.method,
        url: `${import.meta.env.VITE_BASE_URL}${ApiURLS.AddToCartOrder.url}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Item added to cart successfully:", response.data);
        // Optionally add a success notification or navigate
      } else {
        console.error("Failed to add item to cart:", response);
        // Optionally show an error message to the user
      }
    } catch (error) {
      console.error(
        "Error adding item to cart:",
        error.response ? error.response.data : error.message
      );
      // Optionally show an error message to the user
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-xl p-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Review Your Design
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            {tempProduct.FinalProductImg ? (
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <img
                    src={tempProduct.FinalProductImg}
                    alt="Final Design"
                    className="w-full h-[300px] object-cover rounded-lg shadow-md"
                  />
                  <p className="text-center mt-2 text-gray-600">
                    Final Product Design
                  </p>
                </div>

                {tempProduct.CustomerImg && (
                  <div className="flex-1">
                    <img
                      src={tempProduct.CustomerImg}
                      alt="Customer Image"
                      className="w-full h-[300px] object-cover rounded-lg shadow-md"
                    />
                    <p className="text-center mt-2 text-gray-600">
                      Your Original Image
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-[300px] bg-gray-100 flex items-center justify-center rounded-lg">
                <p className="text-gray-500">No design available</p>
              </div>
            )}
          </div>

          {tempProduct.TextActive && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 text-gray-700">
                Text Details
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Font:</span>
                  <span className="font-medium">{tempProduct.Font}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Text:</span>
                  <span className="font-medium">{tempProduct.Text}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Color:</span>
                  <span className="font-medium">{tempProduct.Color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Text Editing Cost:</span>
                  <span className="font-medium">
                    ₹{tempProduct.TextEditingCost}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>

            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Quantity</span>
              <div className="flex items-center border rounded-lg">
                <IconButton
                  size="small"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <KeyboardArrowDown />
                </IconButton>
                <span className="px-4 text-lg font-semibold">{quantity}</span>
                <IconButton
                  size="small"
                  onClick={incrementQuantity}
                  disabled={quantity >= 10}
                >
                  <KeyboardArrowUp />
                </IconButton>
              </div>
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Editing Cost</span>
                <span className="font-medium">₹{tempProduct.EditingCost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Product Cost</span>
                <span className="font-medium">₹{tempProduct.Price}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span>₹{calculateSubTotal()}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 gap-3">
            <MTooltipButton
              title="Cancel Order"
              variant="outlined"
              color="success"
            >
              Cancel Order
            </MTooltipButton>
            <MTooltipButton
              title="Proceed to Checkout"
              variant="contained"
              color="success"
              startIcon={<ShoppingCart />}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </MTooltipButton>
            <MTooltipButton
              title="Add to cart"
              variant="contained"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
            >
              Add to cart
            </MTooltipButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
