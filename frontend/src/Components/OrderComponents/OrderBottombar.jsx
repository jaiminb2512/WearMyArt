import { Drawer } from "@mui/material";
import React, { useState } from "react";
import OrderFilter from "./OrderFilter";
import { BsFilter } from "react-icons/bs";

const OrderBottombar = ({ setFilterOptions, filterOptions, FilterData }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  return (
    <div>
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
          <OrderFilter
            FilterData={FilterData}
            setFilterOptions={setFilterOptions}
            filterOptions={filterOptions}
            allOrders={true}
            setFilterOpen={setFilterOpen}
            BottomBar={true}
          />
        </Drawer>
      </div>
    </div>
  );
};

export default OrderBottombar;
