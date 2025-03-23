import React, { useMemo, useState } from "react";
import { useApiMutation, useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import { Dialog, DialogContent } from "@mui/material";
import ProductForm from "../Components/ProductComponents/ProductForm";
import ProductFilter from "../Components/ProductComponents/ProductFilter";
import ProductTopbar from "../Components/ProductComponents/ProductTopbar";
import ProductGridView from "../Components/ProductComponents/ProductGridView";
import ProductBottomBar from "../Components/ProductComponents/ProductBottomBar";
import ProductListView from "../Components/ProductComponents/ProductListView";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const { FilterBarOpen } = useSelector((state) => state.OpenClose);

  const { data: AllProducts = [], isLoading } = useFetchData(
    "all-products",
    ApiURLS.GetAllProduct.url,
    ApiURLS.GetAllProduct.method,
    {
      staleTime: 5 * 60 * 1000, // 5 Minutes
      cacheTime: 10 * 60 * 1000, // 10 Minutes
    }
  );
  const discontinueProductsMutation = useApiMutation(
    ApiURLS.DiscontinueProducts.url,
    ApiURLS.DiscontinueProducts.method
  );

  const reContinueProducts = useApiMutation(
    ApiURLS.RecontinueProducts.url,
    ApiURLS.RecontinueProducts.method
  );

  const handleDiscontinueProducts = async (id) => {
    console.log("ReContinue product:", id);
    await discontinueProductsMutation.mutateAsync({ Products: [id] });
  };
  const handleReContinueProducts = async (id) => {
    console.log("Discontinue product:", id);
    await reContinueProducts.mutateAsync({ Products: [id] });
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
  const [listView, setListView] = useState(true);

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
        filterOptions.Price.some((range) =>
          isPriceInRange(product.Price, range)
        );

      const availabilityMatch =
        filterOptions.Avalibility.includes("All") ||
        (filterOptions.Avalibility.includes("Discontinued") &&
          product.isDiscontinued) ||
        (filterOptions.Avalibility.includes("Available") &&
          !product.isDiscontinued);

      return (
        sizeMatch &&
        sleeveMatch &&
        customizeMatch &&
        colorMatch &&
        priceMatch &&
        availabilityMatch
      );
    }).sort((a, b) =>
      sortOrder === "lowToHigh" ? a.Price - b.Price : b.Price - a.Price
    );
  }, [filterOptions, AllProducts, sortOrder]);

  return (
    <div className="flex h-screen">
      {FilterBarOpen && (
        <div
          className={`fixed top-17 h-screen overflow-y-auto scrollbar-hide border-r transition-all duration-300
      ${FilterBarOpen ? "w-[20vw] sm:block" : "w-0 sm:w-0"}`}
        >
          <div className="pl-[2vw] pt-[5vh] pr-5">
            <ProductFilter
              setFilterOptions={setFilterOptions}
              filterOptions={filterOptions}
              setSortOrder={setSortOrder}
              allowColumnSelection={true}
              allProducts={true}
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
            <ProductTopbar
              listView={listView}
              setListView={setListView}
              count={filteredProducts.length}
              handleOpenDialog={handleOpenDialog}
            />
          </div>
        </div>

        <div className="p-4 mt-17 mb-10 ml-3">
          {listView ? (
            <ProductGridView
              products={filteredProducts}
              loading={isLoading}
              handleOpenDialog={handleOpenDialog}
              count={filteredProducts.length}
              handleDiscontinueProducts={handleDiscontinueProducts}
              handleReContinueProducts={handleReContinueProducts}
            />
          ) : (
            <ProductListView
              products={filteredProducts}
              isLoading={isLoading}
              handleOpenDialog={handleOpenDialog}
              count={filteredProducts.length}
              handleDiscontinueProducts={handleDiscontinueProducts}
              handleReContinueProducts={handleReContinueProducts}
            />
          )}
        </div>
      </div>

      <div className="fixed bottom-0 block sm:hidden h-[10vh] w-full">
        <ProductBottomBar
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
