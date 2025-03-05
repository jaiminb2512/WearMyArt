import React, { useState, useMemo } from "react";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import ProductList from "../Components/ProductList";
import ProductSidebar from "../Components/ProductSidebar";
import ProductTopbar from "../Components/ProductTopbar";

const Products = () => {
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [filterOptions, setFilterOptions] = useState({
    Size: [],
    Sleeve: [],
    CustomizeOption: [],
    Color: [],
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

        return sizeMatch && sleeveMatch && customizeMatch && colorMatch;
      })
      .sort((a, b) =>
        sortOrder === "lowToHigh" ? a.Price - b.Price : b.Price - a.Price
      );
  }, [filterOptions, products, sortOrder]);

  return (
    <div className="flex gap-5 px-[5vw] h-screen">
      <div className="w-[250px] sticky top-0 h-screen overflow-hidden hidden sm:block">
        <ProductSidebar
          setFilterOptions={setFilterOptions}
          filterOptions={filterOptions}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-10  w-full">
          <ProductTopbar
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            count={filteredProducts.length}
          />
        </div>

        <div className="flex-1 overflow-y-auto h-[calc(100vh-70px)] scrollbar-hide top-30">
          <ProductList products={filteredProducts} loading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Products;
