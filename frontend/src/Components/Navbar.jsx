import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../Redux/OpenCloseSlice";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import MTooltipButton from "./MTooltipButton";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { SideBarOpen } = useSelector((state) => state.OpenClose);
  const { user } = useSelector((state) => state.user);
  const showSidebar = location.pathname.includes("/dashboard");

  return (
    <div className="fixed top-0 left-0 w-full z-[1000] h-15 shadow-2xl bg-gradient-to-r from-[#C5F1E1] to-[#dbf1e9]">
      <div className="px-[5vw] flex justify-end items-center py-2 gap-3">
        {showSidebar && (
          <div className="sm:hidden flex justify-center items-center w-12">
            <MTooltipButton
              title={SideBarOpen ? "Close Sidebar" : "Open Sidebar"}
              variant="text"
              className="p-2 flex items-center justify-center w-12 h-10 cursor-pointer bg-gray-200 rounded sm:block"
              onClick={() => dispatch(toggleSidebar(!SideBarOpen))}
            >
              {SideBarOpen ? <MenuOpenIcon /> : <MenuIcon />}
            </MTooltipButton>
          </div>
        )}
        <div className="flex gap-1 md:gap-3 justify-center items-center">
          <MTooltipButton
            variant="text"
            onClick={() => navigate("/")}
            title="Home"
          >
            Home
          </MTooltipButton>
          {!user?.isAdmin && (
            <MTooltipButton
              variant="text"
              title="Products"
              onClick={() => navigate("/products")}
            >
              Products
            </MTooltipButton>
          )}
          {user?.isAdmin && (
            <MTooltipButton
              variant="text"
              title="Dashboard"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </MTooltipButton>
          )}
          {user && !user.isAdmin && (
            <MTooltipButton
              variant="text"
              title="Dashboard"
              onClick={() => navigate("/dashboard/profile")}
            >
              Profile
            </MTooltipButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
