import React, { useMemo, useState } from "react";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import OrderListView from "../Components/OrderComponents/OrderListView";
import OrderBottombar from "../Components/OrderComponents/OrderBottomBar";
import OrderTopBar from "../Components/OrderComponents/OrderTopBar";
import OrderFilter from "../Components/OrderComponents/OrderFilter";
import { useSelector } from "react-redux";

const Orders = () => {
  const { FilterBarOpen } = useSelector((state) => state.OpenClose);
  const {
    data: MyOrders = [],
    isLoading,
    refetch,
  } = useFetchData(
    "MyOrders",
    ApiURLS.GetAllOwnOrders.url,
    ApiURLS.GetAllOwnOrders.method,
    {
      staleTime: 5 * 60 * 1000, // 5 Minutes
      cacheTime: 10 * 60 * 1000, // 10 Minutes
    }
  );

  const [filterOptions, setFilterOptions] = useState({
    Status: [],
    OrderDate: "",
    Duration: { start: "", end: "" },
    Quantity: "",
    FinalCost: "",
    OrderID: "",
    CustomizeOption: [],
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const filteredOrders = useMemo(() => {
    if (!Array.isArray(MyOrders)) return [];
    return MyOrders.filter((order) => {
      const statusMatch =
        !filterOptions.Status.length ||
        filterOptions.Status.includes(order.Status);

      const customizeMatch =
        !filterOptions.CustomizeOption.length ||
        filterOptions.CustomizeOption.includes(order.CustomizeOption);

      const orderDateMatch = (() => {
        if (!filterOptions.OrderDate) return true;

        const inputDate = String(filterOptions.OrderDate).trim();
        const parsedInputDate = new Date(inputDate);

        if (isNaN(parsedInputDate.getTime())) return false;

        const orderCreatedAt = new Date(order.createdAt);
        if (isNaN(orderCreatedAt.getTime())) return false;

        const formattedOrderDate = formatDate(orderCreatedAt);
        const formattedInputDate = formatDate(parsedInputDate);

        return formattedOrderDate === formattedInputDate;
      })();

      const orderIdMatch =
        !filterOptions.OrderID ||
        order.OrderID?.toLowerCase().includes(
          filterOptions.OrderID.toLowerCase()
        );

      return statusMatch && orderDateMatch && orderIdMatch && customizeMatch;
    });
  }, [filterOptions, MyOrders]);

  return (
    <div className="flex h-screen">
      {FilterBarOpen && (
        <div className="fixed top-17 h-screen overflow-y-auto scrollbar-hide border-r transition-all duration-300 w-[20vw]">
          <div className="pl-[2vw] pt-[5vh] pr-5">
            <OrderFilter
              setFilterOptions={setFilterOptions}
              filterOptions={filterOptions}
              MyOrders={true}
            />
          </div>
        </div>
      )}

      <div
        className={`flex-1 flex flex-col overflow-y-scroll scrollbar-hide transition-all duration-300
      ${FilterBarOpen ? "sm:ml-[20vw]" : "ml-0"}`}
      >
        <div className="fixed hidden sm:block top-15 z-20 bg-white shadow-2xl w-full transition-all duration-300">
          <div className="flex gap-1 items-center ml-2 backdrop-blur-3xl pt-3 pb-2 sm:h-15 w-full ">
            <OrderTopBar count={filteredOrders.length} />
          </div>
        </div>

        <div className="p-4 sm:mt-17 mb-10 ml-3">
          <OrderListView
            Orders={filteredOrders}
            loading={isLoading}
            count={filteredOrders.length}
            MyOrders={true}
          />
        </div>
      </div>

      <div className="fixed bottom-0 block sm:hidden h-[10vh] w-full">
        <OrderBottombar
          setFilterOptions={setFilterOptions}
          filterOptions={filterOptions}
        />
      </div>
    </div>
  );
};

export default Orders;
