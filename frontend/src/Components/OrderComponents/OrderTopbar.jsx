import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MTooltip from "../MTooltip";
import { toggleFilterBar } from "../../Redux/OpenCloseSlice";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";

const OrderTopBar = () => {
  const { FilterBarOpen } = useSelector((state) => state.OpenClose);
  const dispatch = useDispatch();
  return (
    <div className="ml-[2vw]">
      <MTooltip title={FilterBarOpen ? "Close Filter" : "Open Filter"}>
        <div
          className="p-2 items-center justify-center w-12 h-10 cursor-pointer bg-gray-200 rounded hidden sm:block"
          onClick={() => dispatch(toggleFilterBar())}
        >
          {FilterBarOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </div>
      </MTooltip>
    </div>
  );
};

export default OrderTopBar;
