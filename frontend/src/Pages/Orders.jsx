import React, { useState } from "react";
import { useFetchData, apiRequest } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import MTable from "../Components/MTable";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OrderListView from "../Components/OrderComponents/OrderListView";

const Orders = () => {
  const [tableView, setTableView] = useState(false);
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

  const handleStatusChange = async (orderId, newStatus) => {
    console.log(orderId, newStatus);
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Final Product"
          style={{ width: 50, height: 50, borderRadius: 5 }}
        />
      ),
    },
    { field: "quantity", headerName: "Quantity", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: (params) => (
        <FormControl fullWidth size="small">
          <Select
            value={params.value}
            onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
          >
            <MenuItem value="Process">Process</MenuItem>
            <MenuItem value="Ready">Ready</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    { field: "finalCost", headerName: "Final Cost", width: 120 },
    { field: "font", headerName: "Font", width: 100 },
    { field: "fontSize", headerName: "Font Size", width: 100 },
    { field: "text", headerName: "Text", width: 150 },
    { field: "color", headerName: "Color", width: 100 },
  ];

  const rows = MyOrders.map((order, index) => ({
    id: order._id || index + 1,
    quantity: order.Quantity || 1,
    status: order.Status || "Process",
    font: order.Font || "N/A",
    fontSize: order.FontSize || "N/A",
    text: order.Text || "N/A",
    color: order.Color || "N/A",
    finalCost: order.FinalCost || "N/A",
    image: `${import.meta.env.VITE_BASE_URL}${order.FinalProductImg}`,
  }));

  return (
    <div className="flex-1 flex flex-col ml-[2vw]">
      <OrderListView
        Orders={MyOrders}
        loading={isLoading}
        allOrders={true}
        count={MyOrders.length}
      />
    </div>
  );
};

export default Orders;
