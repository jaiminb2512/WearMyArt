import React, { useState, useEffect } from "react";
import { useApiMutation } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import { ProductFilterData } from "../Data/FilterData";
import ProductListView from "../Components/ProductComponents/ProductListView";
import ProductFilter from "../Components/ProductComponents/ProductFilter";
import ProductTopbar from "../Components/ProductComponents/ProductTopbar";
import ProductGridView from "../Components/ProductComponents/ProductGridView";
import ProductBottomBar from "../Components/ProductComponents/ProductBottomBar";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
  const { FilterBarOpen } = useSelector((state) => state.OpenClose);
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [listView, setListView] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [pagination, setPagination] = useState({
    totalProducts: 0,
    totalPages: 1,
    currentPage: 1,
  });

  const [filterOptions, setFilterOptions] = useState({
    Size: [],
    Sleeve: [],
    CustomizeOption: [],
    Color: [],
    Price: [0, 5000],
    Sort: ["Low to High"],
  });

  const [products, setProducts] = useState([]);

  const fetchProductsMutation = useApiMutation(
    `${ApiURLS.GetAllActiveProducts.url}?page=${page}&limit=5`,
    ApiURLS.GetAllActiveProducts.method,
    {
      showToastMessage: page === 1,
    }
  );

  const fetchProducts = async (pageNum, reset = false) => {
    try {
      const result = await fetchProductsMutation.mutateAsync({
        ...filterOptions,
        sortOrder,
      });

      const newProducts = result?.products || [];

      if (result?.pagination) {
        setPagination(result.pagination);
      }

      if (reset) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
      }

      if (result?.pagination) {
        setHasMore(pageNum < result.pagination.totalPages);
      } else {
        setHasMore(newProducts.length >= 5);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    fetchProducts(1, true);
  }, [filterOptions, sortOrder]);

  useEffect(() => {
    if (page > 1) {
      fetchProducts(page, false);
    }
  }, [page]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const isLoading = fetchProductsMutation.isLoading && products.length === 0;

  return (
    <div className="flex h-screen">
      <div
        className={`fixed h-screen overflow-y-auto scrollbar-hide transition-all duration-300
        ${
          FilterBarOpen
            ? "sm:block w-[35vw] lg:w-[25vw] border-r"
            : "w-0 sm:w-0"
        }`}
      >
        {FilterBarOpen && (
          <div className="pl-[2vw] pt-[2vh] pr-5">
            <ProductFilter
              setFilterOptions={setFilterOptions}
              filterOptions={filterOptions}
              applySorting={true}
              setSortOrder={setSortOrder}
              allowColumnSelection={true}
              allProducts={true}
            />
          </div>
        )}
      </div>

      <div
        className={`flex-1 flex flex-col transition-all duration-300
        ${FilterBarOpen ? "ml-[35vw] lg:ml-[25vw] xl:ml-[25vw]" : "ml-0"}`}
      >
        <div className="fixed w-full bg-gray-100 shadow-2xl z-[999]">
          <div className="flex gap-1 items-center w-full sm:w-[80vw] ml-2 backdrop-blur-3xl pt-3 pb-2 h-15">
            <ProductTopbar
              listView={listView}
              setListView={setListView}
              count={pagination.totalProducts}
            />
          </div>
        </div>

        <div
          id="scrollableProductDiv"
          className="overflow-auto mt-17 mb-10 sm:mb-0 h-full scrollbar-hide"
        >
          <InfiniteScroll
            dataLength={products.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            }
            scrollableTarget="scrollableProductDiv"
            className="p-4"
          >
            {listView ? (
              <ProductListView
                products={products}
                isLoading={isLoading}
                count={pagination.totalProducts}
              />
            ) : (
              <ProductGridView
                products={products}
                loading={isLoading}
                count={pagination.totalProducts}
              />
            )}
          </InfiniteScroll>
        </div>
      </div>

      <div className="fixed bottom-0 block sm:hidden h-[fit-content] w-full">
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
