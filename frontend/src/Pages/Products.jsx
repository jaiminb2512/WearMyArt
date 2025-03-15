import React, { useState, useMemo } from "react";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import { ProductFilterData } from "../Data/FilterData";
import ProductListView from "../Components/Product/ProductListView";
import ProductFilter from "../Components/Product/ProductFilter";
import ProductTopbar from "../Components/Product/ProductTopbar";
import ProductGridView from "../Components/Product/ProductGridView";
import ProductBottomBar from "../Components/Product/ProductBottomBar";

const Products = () => {
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

  const { data: products = [], isLoading } = useFetchData(
    "Products",
    ApiURLS.GetAllActiveProducts.url,
    ApiURLS.GetAllActiveProducts.method,
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  const isPriceInRange = (price, range) => {
    if (!range) return true;
    if (range === "0-499") return price >= 0 && price <= 499;
    if (range === "499-999") return price >= 499 && price <= 999;
    if (range === "999-1999") return price >= 999 && price <= 1999;
    if (range === "1999+") return price >= 1999;
    return true;
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const sizeMatch =
          !filterOptions.Size.length ||
          filterOptions.Size.includes(product.Size);
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
      })
      .sort((a, b) =>
        sortOrder === "lowToHigh" ? a.Price - b.Price : b.Price - a.Price
      );
  }, [filterOptions, products, sortOrder]);

  return (
    <div className="flex h-screen">
      <div className="fixed pt-[5vh] pl-2 h-screen overflow-y-auto scrollbar-hide hidden sm:block sm:w-[20vw] pr-5 border-r top-17">
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
          <div className="flex gap-1 items-center w-full sm:w-[80vw] ml-2 px-[5vw] backdrop-blur-3xl pt-3 pb-2 h-15 ">
            <ProductTopbar
              listView={listView}
              setListView={setListView}
              count={filteredProducts.length}
            />
          </div>
        </div>

        <div className="p-4 mt-17 mb-10 sm:mb-0">
          {listView ? (
            <ProductGridView products={filteredProducts} loading={isLoading} />
          ) : (
            <ProductListView
              products={filteredProducts}
              isLoading={isLoading}
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
    </div>
  );
};

export default Products;
