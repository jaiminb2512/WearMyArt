import React, { useState, useMemo } from "react";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import { FilterData } from "../Data/FilterData";
import ListView from "../Components/ListView";
import ProductFilter from "../Components/Product/ProductFilter";
import ProductTopbar from "../Components/Product/ProductTopbar";
import ProductList from "../Components/Product/ProductList";
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

  const allColumns = [
    { field: "image", headerName: "Image", width: 100 },
    { field: "color", headerName: "Color", width: 50 },
    { field: "size", headerName: "Size", width: 50 },
    { field: "sleeve", headerName: "Sleeve", width: 100 },
    { field: "price", headerName: "Price", type: "number", width: 50 },
    {
      field: "discountedPrice",
      headerName: "Discounted Price",
      type: "number",
      width: 70,
    },
    { field: "stock", headerName: "Stock", type: "number", width: 70 },
    { field: "customizeOption", headerName: "Customization", width: 100 },
  ];

  const columns = allColumns.filter((col) =>
    (filterOptions.VisibleColumns || []).includes(col.field)
  );

  const rows = filteredProducts.map((product, index) => ({
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
    <div className="flex h-screen">
      <div className="sticky top-0 pl-5 pt-[5vh] h-screen overflow-y-auto scrollbar-hide hidden sm:block sm:w-[20vw] pr-5 border-r">
        <ProductFilter
          FilterData={FilterData}
          setFilterOptions={setFilterOptions}
          filterOptions={filterOptions}
          applySorting={true}
          setSortOrder={setSortOrder}
          allowColumnSelection={true}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-y-scroll scrollbar-hide">
        <div className="sticky top-0 w-full z-20 bg-white shadow-2xl">
          <div className="flex gap-1 items-center w-full ml-2 px-[5vw] backdrop-blur-3xl pt-3 pb-2">
            <ProductTopbar
              listView={listView}
              setListView={setListView}
              count={filteredProducts.length}
            />
          </div>
        </div>

        <div className="p-4 mt-4">
          {listView ? (
            <ProductList products={filteredProducts} loading={isLoading} />
          ) : (
            <ListView
              rows={rows}
              columns={columns}
              setListView={setListView}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>

      <div className="fixed bottom-0 block sm:hidden h-[10vh] w-full">
        <ProductBottomBar
          FilterData={FilterData}
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
