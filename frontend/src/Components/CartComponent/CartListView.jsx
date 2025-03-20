import React from "react";
import { useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Button } from "@mui/material";
import MTooltip from "../MTooltip";

const CartListView = ({ MyCart, isLoading = false }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!MyCart || MyCart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-[70vh] ">
        <div className="bg-gray-100 rounded-full p-8 flex items-center justify-center">
          <ShoppingBagIcon className="w-64 h-64 text-gray-500" />
        </div>
        <p className="text-gray-600 text-lg font-medium">
          Your Cart is empty. Start shopping now!
        </p>
        <MTooltip title="Start shopping">
          <Button
            variant="contained"
            color="success"
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl shadow-md transition-all duration-300"
            onClick={() => navigate("/products")}
          >
            Start shopping
          </Button>
        </MTooltip>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "N/A";
    return date.toLocaleDateString();
  };

  return <div>CartListView</div>;
};

export default CartListView;
