import React from "react";
import { Button } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ProductImages from "../ProductComponents/ProductImages";
import BlockIcon from "@mui/icons-material/Block";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import SingleOrder from "./SingleOrder";

const OrderListView = ({ Orders, loading, allOrders = false, count }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!Orders || Orders.length === 0) {
    return (
      <div className="text-center text-gray-500 text-lg">
        No orders to display
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "N/A";
    return date.toLocaleDateString();
  };

  const navigate = useNavigate();

  const handleRedirect = (order) => {
    navigate("/dashboard/order", { state: { order } });
  };

  return (
    <section>
      <h1 className="relative text-lg font-bold hidden sm:block">{`${count} Orders`}</h1>
      <div className="grid gap-8">
        {Orders.map((order) => {
          const {
            _id,
            CustomerImg,
            FinalProductImg,
            Quantity,
            FinalCost,
            Status,
            createdAt,
            CustomizeOption,
            Font,
            Text,
            Color,
          } = order;

          const imgs = [FinalProductImg];
          const altNames = ["Final Product Img"];

          if (CustomizeOption === "Photo") {
            imgs.push(CustomerImg);
            altNames.push("Customer Img");
          }

          return (
            <div className="border rounded-2xl">
              <SingleOrder allOrders={true} key={_id} order={order} />;
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OrderListView;
