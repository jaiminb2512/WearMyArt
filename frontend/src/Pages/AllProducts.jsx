import React, { useState } from "react";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import { Button, Dialog, DialogContent } from "@mui/material";
import MTable from "../Components/MTable";
import ListView from "../Components/ListView";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ProductForm from "../Components/Product/ProductForm";
import BlockIcon from "@mui/icons-material/Block";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

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
  const [tableView, setTableView] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleStockChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setUserStock(isNaN(value) ? 0 : value);
  };

  const handleOpenDialog = (product = null) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
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
      flex: 2,
    },
    { field: "color", headerName: "Color", width: 100, flex: 1 },
    { field: "size", headerName: "Size", width: 100, flex: 1 },
    { field: "sleeve", headerName: "Sleeve", width: 100, flex: 1 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 100,
      flex: 1,
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      width: 180,
      renderCell: (params) => {
        const productData = products.find(
          (product) => product._id === params.id
        );

        return (
          <Button
            variant="contained"
            className="w-[fit-content]"
            onClick={() => {
              console.log("Edit button clicked for product:", productData);
              handleOpenDialog(productData);
            }}
          >
            <ModeEditIcon />
          </Button>
        );
      },
    },
    {
      field: "discountedPrice",
      headerName: "Discounted Price",
      type: "number",
      width: 70,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      width: 70,
      flex: 1,
    },
    {
      field: "customizeOption",
      headerName: "Customization",
      width: 100,
      flex: 1,
    },
    {
      field: "discontinued",
      headerName: "Discontinue",
      width: 120,
      flex: 1,
      renderCell: (params) => {
        const productData = products.find(
          (product) => product._id === params.id
        );

        return productData?.isDiscontinued ? (
          <Button
            variant="contained"
            className="w-[fit-content]"
            color="secondary"
            onClick={() => {
              console.log(
                "ReContinue button clicked for product:",
                productData._id
              );
            }}
          >
            {/* ReContinue */}
            <ControlPointIcon />
          </Button>
        ) : (
          <Button
            variant="contained"
            className="w-[fit-content]"
            color="error"
            onClick={() => {
              console.log(
                "Discontinue button clicked for product:",
                productData._id
              );
            }}
          >
            {/* Discontinue */}
            <BlockIcon />
          </Button>
        );
      },
    },
  ];

  const rows = products.map((product, index) => ({
    id: product._id || index + 1,
    image: product.ImgURL,
    color: product.Color || "N/A",
    size: product.Size || "N/A",
    sleeve: product.Sleeve || "N/A",
    price: product.Price,
    discountedPrice: product.DiscountedPrice || "N/A",
    stock: product.Stock || 0,
    customizeOption: product.CustomizeOption || "N/A",
  }));

  return (
    <div className="flex-1 flex flex-col ">
      <div className="sticky top-15 w-full z-10 hidden sm:block shadow-2xl">
        <div className="hidden sm:flex gap-1 items-center w-full ml-2 px-[5vw] backdrop-blur-3xl pt-3 pb-2">
          {/* <TextField
            type="number"
            label="Stock Threshold"
            variant="outlined"
            value={userStock}
            onChange={handleStockChange}
          /> */}

          <Button
            variant="contained"
            className="w-[fit-content]"
            onClick={() => setTableView(!tableView)}
          >
            {tableView ? "Grid View" : "Table View"}
          </Button>

          <Button variant="contained" className="w-[fit-content]">
            Show filter
          </Button>
          <Button
            variant="contained"
            className="w-[fit-content]"
            onClick={() => {
              console.log("Add Product button clicked");
              handleOpenDialog();
            }}
          >
            Add Product
          </Button>
        </div>
      </div>
      <div className="mt-2 ml-2">
        {tableView ? (
          <MTable rows={rows} columns={columns} isLoading={isLoading} />
        ) : (
          <div className="mx-[5vw] mt-[2vw]">
            <ListView rows={rows} columns={columns} isLoading={isLoading} />
          </div>
        )}
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        aria-labelledby="product-form-dialog"
        PaperProps={{
          style: {
            maxHeight: "95vh",
          },
        }}
      >
        <DialogContent>
          <ProductForm
            product={selectedProduct}
            onClose={handleCloseDialog}
            handleCloseDialog={handleCloseDialog}
            isEdit={!!selectedProduct}
            title={selectedProduct ? "Edit Product" : "Add New Product"}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllProducts;
