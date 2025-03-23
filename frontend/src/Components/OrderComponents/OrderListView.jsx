import React from "react";
import { useNavigate } from "react-router-dom";
import SingleOrder from "./SingleOrder";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Button from "@mui/material/Button";
import MTooltip from "../MTooltip";
import { useSelector } from "react-redux";

const OrderListView = ({ Orders, loading, count = null }) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { isAdmin } = user;

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!Orders || Orders.length === 0) {
    return (
      <div>
        {isAdmin ? (
          <div className="flex flex-col items-center justify-center gap-4 h-[70vh] ">
            <MTooltip title="No Order Found">
              <Button
                variant="outlined"
                color="success"
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl shadow-md transition-all duration-300"
              >
                No Order Found
              </Button>
            </MTooltip>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 h-[70vh]">
            <div className="bg-gray-100 rounded-full p-8 flex items-center justify-center">
              <ShoppingBagIcon className="w-64 h-64 text-gray-500" />
            </div>
            <p className="text-gray-600 text-lg font-medium">
              Your order list is empty. Start shopping now!
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
        )}
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "N/A";
    return date.toLocaleDateString();
  };

  const handleRedirect = (order) => {
    navigate("/dashboard/order", { state: { order } });
  };

  return (
    <section>
      {count && (
        <h1 className="relative text-lg font-bold hidden sm:block">{`${count} Orders`}</h1>
      )}
      <div className="grid gap-8">
        {Orders.map((order) => {
          const { _id, CustomerImg, FinalProductImg, CustomizeOption } = order;

          const imgs = [FinalProductImg];
          const altNames = ["Final Product Img"];

          if (CustomizeOption === "Photo") {
            imgs.push(CustomerImg);
            altNames.push("Customer Img");
          }

          return (
            <div className="border rounded-2xl">
              <SingleOrder isAdmin={true} key={_id} order={order} />;
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OrderListView;
