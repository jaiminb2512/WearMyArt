import React from "react";
import { useNavigate } from "react-router-dom";
import SingleOrder from "./SingleOrder";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useSelector } from "react-redux";
import MTooltipButton from "../MTooltipButton";

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
    <div className="w-full">
      {isAdmin ? (
        <div className="flex flex-col items-center justify-center gap-4 h-[70vh]">
          <MTooltipButton
            title="No Order Found"
            variant="outlined"
            color="success"
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl shadow-md transition-all duration-300"
          >
            No Order Found
          </MTooltipButton>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 h-[70vh]">
          <div className="bg-gray-100 rounded-full p-8 flex items-center justify-center">
            <ShoppingBagIcon className="w-16 h-16 md:w-32 md:h-32 lg:w-64 lg:h-64 text-gray-500" />
          </div>
          <p className="text-gray-600 text-lg font-medium text-center px-4">
            Your order list is empty. Start shopping now!
          </p>
          <MTooltipButton
            title="Start shopping"
            variant="contained"
            color="success"
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl shadow-md transition-all duration-300"
            onClick={() => navigate("/products")}
          >
            Start shopping
          </MTooltipButton>
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
    <section className="w-full overflow-hidden">
      {count && (
        <h1 className="relative text-lg font-bold my-4">{`${count} Orders`}</h1>
      )}
      <div className="grid gap-4 xl:grid-cols-2">
        {Orders.map((order) => (
          <div className="border rounded-2xl overflow-hidden" key={order._id}>
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
