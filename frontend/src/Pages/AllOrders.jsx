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
// import ListView from "../Components/ListView";

const AllOrders = () => {
  const {
    data: allOrders = [],
    isLoading,
    refetch,
  } = useFetchData(
    "AllOrders",
    ApiURLS.GetAllOrders.url,
    ApiURLS.GetAllOrders.method,
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
      flex: 1,
    },
    { field: "quantity", headerName: "Quantity", width: 100, flex: 1 },
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
      flex: 1,
    },
    { field: "finalCost", headerName: "Final Cost", flex: 1 },
    { field: "font", headerName: "Font", flex: 1 },
    { field: "fontSize", headerName: "Font Size", flex: 1 },
    { field: "text", headerName: "Text", flex: 1 },
    { field: "color", headerName: "Color", flex: 1 },
  ];

  const rows = allOrders.map((order, index) => ({
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
    <div>
      {/* <ListView rows={rows} columns={columns} isLoading={isLoading} /> */}
      <MTable rows={rows} columns={columns} isLoading={isLoading} />
    </div>
  );
};

export default AllOrders;
