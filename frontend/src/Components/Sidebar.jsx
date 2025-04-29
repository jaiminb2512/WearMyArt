import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sidebarCustomer,
  sidebarAdmin,
  sidebarBottom,
} from "../Data/NavigationData";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import useLogOut from "../utils/Logout";
import { toggleSidebar, toggleHideText } from "../Redux/OpenCloseSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { SideBarOpen, SmScreen, HideText } = useSelector(
    (state) => state.OpenClose
  );
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { logOut } = useLogOut();

  const isAdmin = user?.isAdmin || false;
  const sidebarData = isAdmin ? sidebarAdmin : sidebarCustomer;

  return (
    <div
      className={`fixed h-[100vh] shadow-lg transition-all duration-300 bg-primary text-primary-contrast z-[1000] bg-gradient-to-b from-[#C5F1E1] to-white ${
        SideBarOpen
          ? HideText
            ? "w-20"
            : "w-fit lg:w-[25vw] xl:w-[20vw]"
          : "w-0"
      } overflow-hidden`}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-center justify-center h-15 bg-green-100">
          <h6 className="font-bold">{HideText ? "WA" : "WearMyArt"}</h6>
        </div>

        <div className="flex-grow p-4">
          {sidebarData.map((menu) => (
            <div
              key={menu.name}
              className={`flex items-center gap-2 py-2 px-4 mb-1 rounded cursor-pointer hover:bg-primary-light ${
                window.location.pathname.includes(menu.path)
                  ? "bg-primary-dark"
                  : ""
              }`}
              onClick={() => {
                navigate(`${menu.path}`);
                if (SmScreen) dispatch(toggleSidebar(false));
              }}
            >
              <menu.icon className="text-primary-contrast" />
              {!HideText && <span className="text-sm">{menu.name}</span>}
            </div>
          ))}
        </div>

        <div className="mb-4">
          {sidebarBottom.map((menu) => (
            <div
              key={menu.name}
              className="flex items-center gap-2 py-2 px-4 mb-1 rounded cursor-pointer hover:bg-primary-light"
              onClick={() => {
                if (menu.name === "Log Out") {
                  logOut();
                } else {
                  navigate(`/dashboard${menu.path}`);
                }
                if (SmScreen) dispatch(toggleSidebar(false));
              }}
            >
              <menu.icon className="text-primary-contrast" />
              {!HideText && <span className="text-sm">{menu.name}</span>}
            </div>
          ))}

          <div className="hidden sm:block">
            <div
              className="flex items-center gap-2 py-2 px-4 mb-1 rounded cursor-pointer hover:bg-primary-light"
              onClick={() => dispatch(toggleHideText(!HideText))}
            >
              {HideText ? (
                <KeyboardDoubleArrowRightIcon />
              ) : (
                <KeyboardDoubleArrowLeftIcon />
              )}
              {!HideText && <span className="text-sm">Minimize</span>}
            </div>
          </div>

          <div className="block sm:hidden py-2 px-4 mb-1 rounded cursor-pointer">
            <button
              onClick={() => dispatch(toggleSidebar(false))}
              className="flex items-center gap-2 text-primary-contrast"
            >
              <KeyboardDoubleArrowLeftIcon />
              <span className="text-sm">Close Sidebar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
