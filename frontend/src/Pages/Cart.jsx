import React, { useEffect } from "react";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import CartListView from "../Components/CartComponents/CartListView";
import CartTopBar from "../Components/CartComponents/CartTopBar";
import CheckoutSummary from "../Components/CartComponents/CheckoutSummary";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MTooltipButton from "../Components/MTooltipButton";
import { useDispatch } from "react-redux";
import {
  addProducts,
  addTotalCost,
  resetCartState,
} from "../Redux/BuyProductSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { data: MyCart = [], isLoading } = useFetchData(
    "MyCart",
    ApiURLS.GetCartOrder.url,
    ApiURLS.GetCartOrder.method,
    {
      staleTime: 5 * 60 * 1000, // 5 Minutes
      cacheTime: 10 * 60 * 1000, // 10 Minutes
    }
  );

  useEffect(() => {
    dispatch(resetCartState());
  }, []);

  useEffect(() => {
    dispatch(addProducts(MyCart));
    const total = MyCart.reduce((sum, item) => {
      return sum + item.orderData.Quantity * item.orderData.FinalCost;
    }, 0);
    dispatch(addTotalCost(total));
  }, [MyCart, dispatch]);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!MyCart || MyCart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-[70vh]">
        <p className="text-gray-600 text-lg font-medium">
          Your Cart is empty. Start shopping now!
        </p>

        <MTooltipButton
          title="  Start Shopping"
          variant="contained"
          color="success"
          onClick={() => navigate("/products")}
          className="flex gap-2 justify-center items-center"
        >
          <span className="hidden sm:block"> Start Shopping</span>
        </MTooltipButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full">
      <div className="w-full fixed top-15 z-10 bg-white shadow-md">
        <CartTopBar />
      </div>
      <div className="flex flex-col md:flex-row  w-full mt-24 mb-10 pl-[3vw] pr-[1vw]">
        <div className="w-full rounded-lg">
          <div className="flex flex-col md:flex-row">
            <div className="w-full">
              <div className="w-[100%] flex md:w-[60%] md:justify-between mb-4">
                <Typography variant="h6" className="text-gray-600">
                  Cart
                </Typography>
                <Typography variant="h6" className="text-gray-600">
                  ({MyCart.length})
                </Typography>
              </div>
              <CartListView />
            </div>
            <div className="w-full md:w-[40%] rounded-lg md:pt-6 mb-6 sm:mb-0">
              <CheckoutSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
