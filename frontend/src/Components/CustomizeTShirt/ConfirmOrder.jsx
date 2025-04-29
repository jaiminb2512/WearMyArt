import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  ShoppingCart,
  CheckCircle,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import MTooltipButton from "../MTooltipButton";
import { useNavigate } from "react-router-dom";
import {
  addProducts,
  addTotalCost,
  setBuyNow,
} from "../../Redux/BuyProductSlice";
import { clearProductData } from "../../Redux/TempProductSlice";
import ApiURLS from "../../Data/ApiURLS";
import axios from "axios";
import { showToast } from "../../Redux/ToastSlice";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tempProduct = useSelector((state) => state.tempProduct);
  const [quantity, setQuantity] = useState(1);
  const { TotalCost } = useSelector((state) => state.BuyProduct);

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

  const base64ToBlob = (base64, mimeType) => {
    let byteCharacters = atob(base64.split(",")[1]);
    let byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const makeOrderData = () => {
    const formData = new FormData();

    formData.append("ProductId", tempProduct.ProductId);
    formData.append("Quantity", quantity);
    formData.append("FinalCost", tempProduct.EditingCost + tempProduct.Price);
    formData.append("CustomizedType", tempProduct.CustomizedType);

    if (
      tempProduct.CustomizedType === "Text" ||
      tempProduct.CustomizedType === "Both"
    ) {
      if (tempProduct.Font) formData.append("Font", tempProduct.Font);
      if (tempProduct.TextStyle)
        formData.append("TextStyle", JSON.stringify(tempProduct.TextStyle));
      if (tempProduct.Text) formData.append("Text", tempProduct.Text);
      if (tempProduct.Color) formData.append("Color", tempProduct.Color);
    }

    if (
      tempProduct.CustomizedType === "Photo" ||
      tempProduct.CustomizedType === "Both"
    ) {
      if (tempProduct.CustomerImg) {
        let customerBlob = base64ToBlob(tempProduct.CustomerImg, "image/png");
        formData.append("CustomerImg", customerBlob, "customer.png");
      }
    }

    if (tempProduct.FinalProductImg) {
      let finalBlob = base64ToBlob(tempProduct.FinalProductImg, "image/png");
      formData.append("FinalProductImg", finalBlob, "final_product.png");
    }

    return formData;
  };
  const formDataToObject = (formData) => {
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  };

  const handleAddToCart = async () => {
    try {
      const orderDataArray = makeOrderData();
      const orderData = formDataToObject(orderDataArray);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}${ApiURLS.AddToCartOrder.url}`,
        orderData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(clearProductData());
        dispatch(
          showToast({
            message: response.data.message || "Product added successfully",
            variant: "success",
          })
        );
        navigate("/products");
      } else {
        dispatch(
          showToast({
            message: response.data.message || "Failed to add item to cart",
            variant: "error",
          })
        );
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      dispatch(
        showToast({
          message: error?.response?.data?.message || "Some error occurred",
          variant: "error",
        })
      );
    }
  };

  const handleCheckout = async () => {
    const orderDataArray = makeOrderData();
    const orderData = formDataToObject(orderDataArray);
    dispatch(setBuyNow(true));
    dispatch(addProducts([{ orderData }]));
    navigate("/dashboard/checkout");
  };

  const handleCancelOrder = () => {
    dispatch(clearProductData());
    navigate("/products");
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

            <div className="space-y-2 border-t pt-4 ">
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

          <div className="flex space-x-4 gap-3 flex-col sm:flex-row justify-center items-center">
            <MTooltipButton
              title="Cancel Order"
              variant="outlined"
              color="success"
              onClick={handleCancelOrder}
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
