import React, { useState } from "react";
import { BsFilter } from "react-icons/bs";
import ProductFilter from "./ProductFilter";
import { Drawer } from "@mui/material";

const ProductBottomBar = ({
  sortOrder,
  setFilterOptions,
  filterOptions,
  FilterData,
  setSortOrder,
}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  return (
    <div>
      <div className="fixed bottom-0 left-0 w-full flex justify-around px-[5vw] shadow-md py-2 z-50 cursor-pointer">
        <div
          className="flex flex-col items-center pb-1"
          onClick={() => setFilterOpen(true)}
        >
          <BsFilter size={20} />
          <span className="text-xs">Filter</span>
        </div>
      </div>

      <Drawer
        anchor="bottom"
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            overflow: "hidden",
          },
        }}
      >
        <ProductFilter
          FilterData={FilterData}
          setFilterOptions={setFilterOptions}
          filterOptions={filterOptions}
          applySorting={true}
          sortOrder={sortOrder}
          BottomBar={true}
          setSortOrder={setSortOrder}
          setFilterOpen={setFilterOpen}
        />
      </Drawer>
    </div>
  );
};

export default ProductBottomBar;
