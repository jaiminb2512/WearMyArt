import React, { useState, useEffect } from "react";
import { useApiMutation } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import OrderListView from "../Components/OrderComponents/OrderListView";
import OrderBottombar from "../Components/OrderComponents/OrderBottomBar";
import OrderTopBar from "../Components/OrderComponents/OrderTopBar";
import OrderFilter from "../Components/OrderComponents/OrderFilter";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const Orders = () => {
  const { FilterBarOpen } = useSelector((state) => state.OpenClose);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    page: 1,
    limit: 10,
  });

  const [filterOptions, setFilterOptions] = useState({
    Status: [],
    Quantity: "",
    FinalCost: [0, 5000],
    CustomizedType: [],
    OrderDate: "",
    Duration: {
      start: "",
      end: "",
    },
  });

  const fetchOrdersMutation = useApiMutation(
    `${ApiURLS.GetAllOwnOrders.url}?page=${page}&limit=10`,
    ApiURLS.GetAllOwnOrders.method,
    {
      showToastMessage: page === 1,
    }
  );

  const fetchOrders = async (pageNum, reset = false) => {
    try {
      const result = await fetchOrdersMutation.mutateAsync(filterOptions);

      const newOrders = result?.orders || [];

      if (result?.pagination) {
        setPagination(result.pagination);
      }

      if (reset) {
        setOrders(newOrders);
      } else {
        setOrders((prev) => [...prev, ...newOrders]);
      }

      if (result?.pagination) {
        setHasMore(pageNum < result.pagination.totalPages);
      } else {
        setHasMore(newOrders.length >= 10);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setOrders([]);
    setHasMore(true);
    fetchOrders(1, true);
  }, [filterOptions]);

  useEffect(() => {
    if (page > 1) {
      fetchOrders(page, false);
    }
  }, [page]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const isLoading = fetchOrdersMutation.isLoading && orders.length === 0;

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`fixed h-screen hidden xl:block overflow-y-auto scrollbar-hide border-r transition-all duration-300
        ${FilterBarOpen ? "lg:w-[25vw] xl:w-[20vw] lg:block" : "w-0 sm:w-0"}`}
      >
        {FilterBarOpen && (
          <div className="pl-[2vw] pt-[2vh] pr-5">
            <OrderFilter
              setFilterOptions={setFilterOptions}
              filterOptions={filterOptions}
              MyOrders={true}
            />
          </div>
        )}
      </div>

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
          id="scrollableOrdersDiv"
          className="pt-4 md:p-4 mb-20 ml-3 overflow-y-auto scrollbar-hide"
        >
          <InfiniteScroll
            dataLength={orders.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            }
            scrollableTarget="scrollableOrdersDiv"
          >
            <OrderListView
              Orders={orders}
              loading={isLoading}
              count={pagination.total}
            />
          </InfiniteScroll>
        </div>
      </div>

      <div className="fixed bottom-0 block sm:hidden h-[fit-content] w-full">
        <OrderBottombar
          setFilterOptions={setFilterOptions}
          filterOptions={filterOptions}
        />
      </div>
    </div>
  );
};

export default Orders;
