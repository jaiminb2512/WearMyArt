import { Button } from "@mui/material";
import React, { useState } from "react";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import CartListView from "../Components/CartComponent/CartListView";

const Cart = () => {
  const [tableView, setTableView] = useState(false);
  const {
    data: MyCart = [],
    isLoading,
    refetch,
  } = useFetchData(
    "MyCart",
    ApiURLS.GetCartOrder.url,
    ApiURLS.GetCartOrder.method,
    {
      staleTime: 5 * 60 * 1000, // 5 Minutes
      cacheTime: 10 * 60 * 1000, // 10 Minutes
    }
  );

  return (
    <div className="flex-1 flex flex-col ">
      <CartListView MyCart={MyCart} isLoading={isLoading} />
    </div>
  );
};

export default Cart;
