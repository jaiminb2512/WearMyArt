import React, { useEffect, useState } from "react";
import ApiURLS from "../Data/ApiURLS";
import OrderListView from "../Components/OrderComponents/OrderListView";
import OrderFilter from "../Components/OrderComponents/OrderFilter";
import OrderTopBar from "../Components/OrderComponents/OrderTopBar";
import OrderBottomBar from "../Components/OrderComponents/OrderBottomBar";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useApiMutation } from "../utils/apiRequest";

const AllOrders = () => {
  const { FilterBarOpen } = useSelector((state) => state.OpenClose);

  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [hasMoreOrders, setHasMoreOrders] = useState(true);
  const [filterOptions, setFilterOptions] = useState({
    Status: [],
    OrderDate: "",
    Duration: { start: "", end: "" },
    Quantity: "",
    FinalCost: [0, 5000],
    CustomizedType: [],
  });

  const dispatch = useDispatch();

  const fetchOrdersMutation = useApiMutation(
    `${ApiURLS.GetAllOrders.url}?page=${page}&limit=10`,
    ApiURLS.GetAllOrders.method
  );

  const fetchOrders = async (pageNum, resetData = false) => {
    try {
      const url = `${ApiURLS.GetAllOrders.url}?page=${pageNum}&limit=5`;

      const response = await fetchOrdersMutation.mutateAsync({
        ...filterOptions,
        showToastMessage: pageNum === 1,
      });

      const newOrders = response?.orders || [];
      setPagination(response?.pagination || {});

      if (resetData) {
        setOrders(newOrders);
      } else {
        setOrders((prev) => [...prev, ...newOrders]);
      }

      if (response?.pagination) {
        setHasMoreOrders(pageNum < response.pagination.totalPages);
      } else {
        setHasMoreOrders(newOrders.length >= 5);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setHasMoreOrders(false);
    }
  };

  useEffect(() => {
    fetchOrders(page, page === 1);
  }, [page]);

  useEffect(() => {
    setPage(1);
    setOrders([]);
    setHasMoreOrders(true);
    fetchOrders(1, true);
  }, [filterOptions]);

  const loadMoreOrders = () => {
    if (hasMoreOrders) {
      setPage((prev) => prev + 1);
    }
  };

  const updateOrderInList = (updatedOrder) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
    );
  };

  return (
    <div className="flex h-screen overflow-x-hidden">
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
        className={`flex-1 flex flex-col transition-all duration-300
        ${FilterBarOpen ? "lg:ml-[25vw] xl:ml-[20vw]" : "ml-0"}`}
      >
        <div className="hidden lg:block sticky top-0 z-20 bg-white shadow-2xl w-full transition-all duration-300">
          <div className="flex gap-1 items-center ml-2 backdrop-blur-3xl pt-3 pb-2 sm:h-15 w-full">
            <OrderTopBar count={pagination.total} />
          </div>
        </div>

        <div
          className="p-4 mb-20 ml-3 overflow-y-auto scrollbar-hide"
          id="scrollableDiv"
        >
          <InfiniteScroll
            dataLength={orders.length}
            next={loadMoreOrders}
            hasMore={hasMoreOrders}
            loader={
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            }
            scrollableTarget="scrollableDiv"
            scrollThreshold="200px"
          >
            <OrderListView
              Orders={orders}
              count={pagination.total}
              setOrders={updateOrderInList}
            />
          </InfiniteScroll>
        </div>
      </div>

      <div className="fixed bottom-0 block xl:hidden h-[7vh] w-full bg-gray-100 z-30">
        <OrderBottomBar
          setFilterOptions={setFilterOptions}
          filterOptions={filterOptions}
        />
      </div>
    </div>
  );
};

export default AllOrders;
