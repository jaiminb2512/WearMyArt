import React, { useMemo, useState } from "react";
import ApiURLS from "../Data/ApiURLS";
import OrderListView from "../Components/OrderComponents/OrderListView";
import OrderFilter from "../Components/OrderComponents/OrderFilter";
import OrderTopBar from "../Components/OrderComponents/OrderTopBar";
import OrderBottomBar from "../Components/OrderComponents/OrderBottomBar";
import { useFetchData } from "../utils/apiRequest";
import { useSelector } from "react-redux";
import { OrderFilterData } from "../Data/FilterData";

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
        const [inputDay, inputMonth, inputYear] = inputDate
          .split("/")
          .map(Number);
        if (isNaN(inputDay) || isNaN(inputMonth) || isNaN(inputYear))
          return false;
        const orderCreatedAt = new Date(order.createdAt);
        if (isNaN(orderCreatedAt.getTime())) return false;
        return (
          orderCreatedAt.getDate() === inputDay &&
          orderCreatedAt.getMonth() + 1 === inputMonth &&
          orderCreatedAt.getFullYear() === inputYear
        );
      })();

      const durationMatch = (() => {
        if (!filterOptions.Duration.start || !filterOptions.Duration.end)
          return true;
        const startDate = new Date(
          ...filterOptions.Duration.start.split("/").reverse().map(Number)
        );
        const endDate = new Date(
          ...filterOptions.Duration.end.split("/").reverse().map(Number)
        );
        const orderCreatedAt = new Date(order.createdAt);
        return orderCreatedAt >= startDate && orderCreatedAt <= endDate;
      })();

      const orderIdMatch =
        !filterOptions.OrderID ||
        order.OrderID?.toLowerCase().includes(
          filterOptions.OrderID.toLowerCase()
        );

      const quantityMatch =
        !filterOptions.Quantity || order.Quantity == filterOptions.Quantity;

      const finalCostMatch = (() => {
        if (!filterOptions.FinalCost) return true;
        const cost = parseFloat(order.FinalCost);

        const selectedRange = OrderFilterData.find(
          (filter) => filter.title === "FinalCost"
        )?.Options.find((range) => range === filterOptions.FinalCost);

        if (!selectedRange) return true;

        if (selectedRange.includes("+")) {
          const min = parseFloat(selectedRange.replace("+", ""));
          return cost >= min;
        }

        const [min, max] = selectedRange.split("-").map(Number);
        return cost >= min && cost <= max;
      })();

      return (
        statusMatch &&
        orderDateMatch &&
        durationMatch &&
        orderIdMatch &&
        customizeMatch &&
        quantityMatch &&
        finalCostMatch
      );
    });
  }, [filterOptions, allOrders]);

  return (
    <div className="flex h-screen">
      {FilterBarOpen && (
        <div
          className={`fixed top-17 hidden xl:block h-screen overflow-y-auto scrollbar-hide border-r transition-all duration-300
      ${FilterBarOpen ? "lg:w-[25vw] xl:w-[20vw] lg:block" : "w-0 sm:w-0"}`}
        >
          <div className="pl-[2vw] pt-[5vh] pr-5">
            <OrderFilter
              setFilterOptions={setFilterOptions}
              filterOptions={filterOptions}
            />
          </div>
        </div>
      )}

      <div
        className={`flex-1 flex flex-col overflow-y-scroll scrollbar-hide transition-all duration-300
      ${FilterBarOpen ? "lg:ml-[25vw] xl:ml-[20vw]" : "ml-0"}`}
      >
        <div className="hidden lg:block fixed top-15 z-20 bg-white shadow-2xl w-full transition-all duration-300">
          <div className="flex gap-1 items-center ml-2 backdrop-blur-3xl pt-3 pb-2 sm:h-15 w-full ">
            <OrderTopBar count={filteredOrders.length} />
          </div>
        </div>

        <div className="p-4 lg:mt-17 mb-10 ml-3">
          <OrderListView
            Orders={filteredOrders}
            loading={isLoading}
            count={filteredOrders.length}
          />
        </div>
      </div>

      <div className="fixed bottom-0 block lg:hidden h-[10vh] w-full bg-gray-100">
        <OrderBottomBar
          setFilterOptions={setFilterOptions}
          filterOptions={filterOptions}
        />
      </div>
    </div>
  );
};

export default AllOrders;
