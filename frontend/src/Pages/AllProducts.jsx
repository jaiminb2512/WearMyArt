import React, { useState } from "react";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import { TextField } from "@mui/material";
import MTable from "../Components/MTable";
import ListView from "../Components/ListView";

const AllProducts = () => {
  const { data: products = [], isLoading } = useFetchData(
    "all-products",
    ApiURLS.GetAllProduct.url,
    ApiURLS.GetAllProduct.method,
    {
      staleTime: 5 * 60 * 1000, // 5 Minutes
      cacheTime: 10 * 60 * 1000, // 10 Minutes
    }
  );

  const [userStock, setUserStock] = useState(10);

  const handleStockChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setUserStock(isNaN(value) ? 0 : value);
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Product"
          style={{ width: 50, height: 50, borderRadius: 5 }}
        />
      ),
    },
    { field: "color", headerName: "Color", width: 100 },
    { field: "size", headerName: "Size", width: 100 },
    { field: "sleeve", headerName: "Sleeve", width: 100 },
    { field: "price", headerName: "Price", type: "number", width: 100 },
    {
      field: "discountedPrice",
      headerName: "Discounted Price",
      type: "number",
      width: 140,
    },
    { field: "stock", headerName: "Stock", type: "number", width: 100 },
    { field: "customizeOption", headerName: "Customization", width: 140 },
    { field: "discontinued", headerName: "Discontinue", width: 120 },
  ];

  // Map products data from API
  const rows = products.map((product, index) => ({
    id: product._id || index + 1,
    image: `${import.meta.env.VITE_BASE_URL}${product.ImgURL[0]}`,
    color: product.Color || "N/A",
    size: product.Size || "N/A",
    sleeve: product.Sleeve || "N/A",
    price: product.Price,
    discountedPrice: product.DiscountedPrice || "N/A",
    stock: product.Stock || 0,
    customizeOption: product.CustomizeOption || "N/A",
    discontinued: product.isDiscontinued ? "Yes" : "No",
  }));

  console.log(columns);

  return (
    <div>
      <TextField
        type="number"
        label="Stock Threshold"
        variant="outlined"
        value={userStock}
        onChange={handleStockChange}
      />

      <MTable rows={rows} columns={columns} isLoading={isLoading} />
      {/* <ListView rows={rows} columns={columns} isLoading={isLoading} /> */}
    </div>
  );
};

export default AllProducts;
