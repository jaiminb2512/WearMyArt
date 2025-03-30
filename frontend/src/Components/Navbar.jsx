import React from "react";
import { useNavigate } from "react-router-dom";
import MTooltip from "./MTooltip";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../Redux/OpenCloseSlice";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import { NavbarData } from "../Data/NavigationData";
import MTooltipButton from "./MTooltipButton";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { SideBarOpen } = useSelector((state) => state.OpenClose);
  console.log(NavbarData);

  return (
    <div className="fixed top-0 left-0 w-full z-[1000] h-15 shadow-2xl bg-gray-100">
      <div className="px-[5vw] flex justify-between sm:justify-end items-center py-2 gap-3">
        <div className="sm:hidden flex justify-center items-center w-12">
          <MTooltip title={SideBarOpen ? "Close Sidebar" : "Open Sidebar"}>
            <Button
              className="p-2 flex items-center justify-center w-12 h-10 cursor-pointer bg-gray-200 rounded sm:block"
              onClick={() => dispatch(toggleSidebar(!SideBarOpen))}
            >
              {SideBarOpen ? <MenuOpenIcon /> : <MenuIcon />}
            </Button>
          </MTooltip>
        </div>
        <div className="flex gap-3">
          {/* <div onClick={() => navigate("/")}>Home</div>
          <div onClick={() => navigate("/products")} className="cursor-pointer">
            Products
          </div>
          <div
            onClick={() => navigate("/dashboard/profile")}
            className="cursor-pointer"
          >
            Dashboard
          </div> */}

          {NavbarData.map((nav) => (
            <MTooltipButton
              key={nav.name}
              variant="text"
              title={nav.name}
              onClick={() => navigate(nav.path)}
            >
              {nav.name}
            </MTooltipButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
