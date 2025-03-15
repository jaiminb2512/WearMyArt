import React, { useMemo, useState } from "react";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import { Dialog, DialogContent } from "@mui/material";
import ProductForm from "../Components/Product/ProductForm";
import ProductFilter from "../Components/Product/ProductFilter";
import { ProductFilterData } from "../Data/FilterData";
import ProductTopbar from "../Components/Product/ProductTopbar";
import ProductGridView from "../Components/Product/ProductGridView";
import ProductBottomBar from "../Components/Product/ProductBottomBar";
import ProductListView from "../Components/Product/ProductListView";

const AllProducts = () => {
  const { data: AllProducts = [], isLoading } = useFetchData(
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

  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [filterOptions, setFilterOptions] = useState({
    Size: [],
    Sleeve: [],
    CustomizeOption: [],
    Color: [],
    Price: [],
    Sort: ["Low to High"],
    Avalibility: ["All"],
    VisibleColumns: [
      "image",
      "color",
      "size",
      "sleeve",
      "price",
      "discountedPrice",
      "stock",
      "customizeOption",
    ],
  });
  const [listView, setListView] = useState(false);

  const isPriceInRange = (price, range) => {
    if (!range) return true;
    if (range === "0-499") return price >= 0 && price <= 499;
    if (range === "499-999") return price >= 499 && price <= 999;
    if (range === "999-1999") return price >= 999 && price <= 1999;
    if (range === "1999+") return price >= 1999;
    return true;
  };

  const filteredProducts = useMemo(() => {
    return AllProducts.filter((product) => {
      const sizeMatch =
        !filterOptions.Size.length || filterOptions.Size.includes(product.Size);
      const sleeveMatch =
        !filterOptions.Sleeve.length ||
        filterOptions.Sleeve.includes(product.Sleeve);
      const customizeMatch =
        !filterOptions.CustomizeOption.length ||
        filterOptions.CustomizeOption.includes(product.CustomizeOption);
      const colorMatch =
        !filterOptions.Color.length ||
        filterOptions.Color.includes(product.Color);
      const priceMatch =
        !filterOptions.Price.length ||
        isPriceInRange(product.Price, filterOptions.Price[0]);
      return (
        sizeMatch && sleeveMatch && customizeMatch && colorMatch && priceMatch
      );
    }).sort((a, b) =>
      sortOrder === "lowToHigh" ? a.Price - b.Price : b.Price - a.Price
    );
  }, [filterOptions, AllProducts, sortOrder]);

  return (
    <div className="flex h-screen">
      <div className="fixed top-17 pl-[2vw] pt-[5vh] h-screen overflow-y-auto scrollbar-hide hidden sm:block sm:w-[30vw] md:w-[30vw] lg:w-[20vw] pr-5 border-r">
        <ProductFilter
          ProductFilterData={ProductFilterData}
          setFilterOptions={setFilterOptions}
          filterOptions={filterOptions}
          applySorting={true}
          setSortOrder={setSortOrder}
          allowColumnSelection={true}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-y-scroll scrollbar-hide sm:ml-[20vw]">
        <div className="fixed top-15 w-full z-20 bg-white shadow-2xl">
          <div className="flex gap-1 items-center w-full sm:w-[75vw] ml-2 px-[5vw] backdrop-blur-3xl pt-3 pb-2 sm:h-15 ">
            <ProductTopbar
              listView={listView}
              setListView={setListView}
              count={filteredProducts.length}
              handleOpenDialog={handleOpenDialog}
              allProducts={true}
            />
          </div>
        </div>

        <div className="p-4 mt-17 mb-10">
          {listView ? (
            <ProductGridView
              products={filteredProducts}
              loading={isLoading}
              allProducts={true}
              handleOpenDialog={handleOpenDialog}
            />
          ) : (
            <ProductListView
              products={filteredProducts}
              allProducts={true}
              isLoading={isLoading}
              handleOpenDialog={handleOpenDialog}
            />
          )}
        </div>
      </div>

      <div className="fixed bottom-0 block sm:hidden h-[10vh] w-full">
        <ProductBottomBar
          ProductFilterData={ProductFilterData}
          setFilterOptions={setFilterOptions}
          filterOptions={filterOptions}
          setSortOrder={setSortOrder}
          sortOrder={sortOrder}
        />
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
