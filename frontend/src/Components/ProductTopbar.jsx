import React from "react";
import { MenuItem, Select } from "@mui/material";
import { ListAlt } from "@mui/icons-material";
import { BsSortDown } from "react-icons/bs";

const ProductTopbar = ({ sortOrder, setSortOrder, count }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 w-full px-[5vw] sm:px-0 ">
        <div className="flex items-center px-3 py-1 border rounded-lg gap-3">
          <BsSortDown size={20} />
          <div>
            <span className="text-sm">Sort by :</span>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="ml-2 text-sm font-semibold"
              variant="standard"
              disableUnderline
            >
              <MenuItem value="lowToHigh" className="font-bold">
                Price: Low to High
              </MenuItem>
              <MenuItem value="highToLow" className="font-bold">
                Price: High to Low
              </MenuItem>
            </Select>
          </div>
        </div>
        <h1 className="text-xl font-bold">{`${count} Products`}</h1>
      </div>
      <div className="w-full shadow-2xl"></div>
    </div>
  );
};

export default ProductTopbar;
