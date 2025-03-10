import React, { useState, useMemo } from "react";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import ProductList from "../Components/Product/ProductList";
import ProductSidebar from "../Components/Product/ProductSidebar";
import ProductTopbar from "../Components/Product/ProductTopbar";
import ProductBottomBar from "../Components/Product/ProductBottomBar";
import { FilterData } from "../Data/FilterData";

const Products = () => {
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [filterOptions, setFilterOptions] = useState({
    Size: [],
    Sleeve: [],
    CustomizeOption: [],
    Color: [],
    Price: [],
  });

  const { data: products = [], isLoading } = useFetchData(
    "Products",
    ApiURLS.GetAllActiveProducts.url,
    ApiURLS.GetAllActiveProducts.method,
    {
      staleTime: 5 * 60 * 1000, // 5 Minutes
      cacheTime: 10 * 60 * 1000, // 10 Minutes
    }
  );

  const isPriceInRange = (price, range) => {
    if (!range) return true;

    if (range === "0-499") {
      return price >= 0 && price <= 499;
    } else if (range === "499-999") {
      return price >= 499 && price <= 999;
    } else if (range === "999-1999") {
      return price >= 999 && price <= 1999;
    } else if (range === "1999+") {
      return price >= 1999;
    }
    return true;
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const sizeMatch =
          filterOptions.Size.length === 0 ||
          filterOptions.Size.includes(product.Size);
        const sleeveMatch =
          filterOptions.Sleeve.length === 0 ||
          filterOptions.Sleeve.includes(product.Sleeve);
        const customizeMatch =
          filterOptions.CustomizeOption.length === 0 ||
          filterOptions.CustomizeOption.includes(product.CustomizeOption);
        const colorMatch =
          filterOptions.Color.length === 0 ||
          filterOptions.Color.includes(product.Color);
        const priceMatch =
          filterOptions.Price.length === 0 ||
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
    <div className="flex gap-5 px-[5vw] h-screen mt-[0] sm:mt-[5vh]">
      <div className="sticky top-0 h-screen overflow-hidden hidden sm:block">
        <ProductSidebar
          FilterData={FilterData}
          setFilterOptions={setFilterOptions}
          filterOptions={filterOptions}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-10 w-full hidden sm:block">
          <ProductTopbar
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            count={filteredProducts.length}
          />
        </div>

        <div className="flex-1 overflow-y-auto h-[calc(100vh-70px)] scrollbar-hide pb-[10vh]">
          <ProductList products={filteredProducts} loading={isLoading} />
        </div>
      </div>
      <div className="fixed bottom-0 block sm:hidden h-[10vh] w-full">
        <ProductBottomBar
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          FilterData={FilterData}
          setFilterOptions={setFilterOptions}
          filterOptions={filterOptions}
        />
      </div>
    </div>
  );
};

export default Products;
