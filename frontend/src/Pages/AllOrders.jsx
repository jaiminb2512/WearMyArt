import React, { useMemo, useState } from "react";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import OrderListView from "../Components/OrderComponents/OrderListView";
import OrderFilter from "../Components/OrderComponents/OrderFilter";
import OrderTopBar from "../Components/OrderComponents/OrderTopBar";
import OrderBottomBar from "../Components/OrderComponents/OrderBottomBar";
import { useSelector } from "react-redux";

const AllOrders = () => {
  const { FilterBarOpen } = useSelector((state) => state.OpenClose);

  const { data: allOrders = [], isLoading } = useFetchData(
    "AllOrders",
    ApiURLS.GetAllOrders.url,
    ApiURLS.GetAllOrders.method,
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
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

  const filteredOrders = useMemo(() => {
    return allOrders.filter((order) => {
      const statusMatch =
        !filterOptions.Status.length ||
        filterOptions.Status.includes(order.Status);
      const customizeMatch =
        !filterOptions.CustomizeOption.length ||
        filterOptions.CustomizeOption.includes(order.CustomizeOption);
      const orderDateMatch = (() => {
        if (!filterOptions.OrderDate) return true;

        const inputDate = filterOptions.OrderDate.trim();
        const orderCreatedAt = new Date(order.createdAt);

        if (inputDate.length === 4) {
          return orderCreatedAt.getFullYear().toString() === inputDate;
        } else {
          return (
            orderCreatedAt.toISOString().split("T")[0] ===
            new Date(inputDate).toISOString().split("T")[0]
          );
        }
      })();

      const orderIdMatch =
        !filterOptions.OrderID ||
        order.OrderID.toLowerCase().includes(
          filterOptions.OrderID.toLowerCase()
        );

      return statusMatch && orderDateMatch && orderIdMatch && customizeMatch;
    });
  }, [filterOptions, allOrders]);

  return (
    <div className="flex h-screen">
      {FilterBarOpen && (
        <div className="fixed top-17 h-screen overflow-y-auto scrollbar-hide border-r transition-all duration-300 w-[20vw]">
          <div className="pl-[2vw] pt-[5vh] pr-5">
            <OrderFilter
              setFilterOptions={setFilterOptions}
              filterOptions={filterOptions}
              allOrders={true}
            />
          </div>
        </div>
      )}

      <div
        className={`flex-1 flex flex-col overflow-y-scroll scrollbar-hide transition-all duration-300
      ${FilterBarOpen ? "sm:ml-[20vw]" : "ml-0"}`}
      >
        <div className="fixed top-15 z-20 bg-white shadow-2xl w-full transition-all duration-300">
          <div className="flex gap-1 items-center ml-2 backdrop-blur-3xl pt-3 pb-2 sm:h-15 w-full ">
            <OrderTopBar count={filteredOrders.length} />
          </div>
        </div>

        <div className="p-4 mt-17 mb-10 ml-3">
          <OrderListView
            Orders={filteredOrders}
            loading={isLoading}
            count={filteredOrders.length}
            allOrders={true}
          />
        </div>
      </div>

      <div className="fixed bottom-0 block sm:hidden h-[10vh] w-full">
        <OrderBottomBar
          setFilterOptions={setFilterOptions}
          filterOptions={filterOptions}
        />
      </div>
    </div>
  );
};

export default AllOrders;
