import React from "react";
import { useNavigate } from "react-router-dom";
import SingleOrder from "./SingleOrder";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Button from "@mui/material/Button";
import MTooltip from "../MTooltip";
import { useSelector } from "react-redux";

const OrderListView = ({ Orders, loading, count = null, setOrders }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.isAdmin || false;

  const renderLoadingState = () => (
    <div className="flex justify-center items-center py-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  const renderEmptyState = () => (
    <div>
      {isAdmin ? (
        <div className="flex flex-col items-center justify-center gap-4 h-[70vh]">
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

  if (loading && Orders.length === 0) {
    return renderLoadingState();
  }

  if (!Orders || Orders.length === 0) {
    return renderEmptyState();
  }

  return (
    <section>
      {count && (
        <h1 className="relative text-lg font-bold hidden sm:block">{`${count} Orders`}</h1>
      )}
      <div className="grid gap-3 xl:grid-cols-2">
        {Orders.map((order) => (
          <div className="border rounded-2xl" key={order._id}>
            <SingleOrder
              order={order}
              updateOrderInList={(updatedOrder) => {
                setOrders((prev) =>
                  prev.map((o) =>
                    o._id === updatedOrder._id ? updatedOrder : o
                  )
                );
              }}
            />
          </div>
        ))}
        {loading && <div className="col-span-full">{renderLoadingState()}</div>}
      </div>
    </section>
  );
};

export default OrderListView;
