import React from "react";
import { Button } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ProductImages from "../ProductComponents/ProductImages";

const OrderListView = ({ Orders, loading, allOrders, count }) => {
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

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <section>
      <h1 className="text-lg font-bold hidden sm:block">{`${count} Orders`}</h1>
      <div className="grid gap-8">
        {Orders.map((order) => {
          const {
            _id,
            ProductId,
            CustomerId,
            CustomerImg,
            FinalProductImg,
            Quantity,
            FinalCost,
            Status,
            createdAt,
          } = order;

          return (
            <div
              key={_id}
              className="flex gap-6 border rounded-lg overflow-hidden p-3 flex-col sm:flex-row"
            >
              <div className="w-full sm:w-1/3">
                <ProductImages imgs={[FinalProductImg]} />
              </div>
              <div className="p-4 w-full sm:w-2/3 flex flex-col gap-2">
                <h3 className="text-2xl font-light capitalize">
                  Order ID: {_id}
                </h3>

                <p className="text-gray-700">
                  <span className="font-medium">Customer Name:</span>{" "}
                  {CustomerId?.FullName}
                </p>

                <p className="text-gray-700">
                  <span className="font-medium">Email:</span>{" "}
                  {CustomerId?.Email}
                </p>

                <p className="text-gray-700">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`font-bold ${
                      Status === "Completed"
                        ? "text-green-600"
                        : Status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {Status}
                  </span>
                </p>

                <p className="text-gray-700">
                  <span className="font-medium">Quantity:</span> {Quantity}
                </p>

                <p className="text-gray-700">
                  <span className="font-medium">Final Cost:</span> ₹{FinalCost}
                </p>

                <p className="text-gray-700">
                  <span className="font-medium">Order Date:</span>{" "}
                  {formatDate(createdAt)}
                </p>

                <div className="flex gap-3">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => console.log("Edit order:", _id)}
                  >
                    <ModeEditIcon />{" "}
                    <span className="hidden sm:block">Edit Order</span>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OrderListView;
