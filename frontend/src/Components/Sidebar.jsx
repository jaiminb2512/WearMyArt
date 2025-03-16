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
import { toggleSidebar } from "../Redux/OpenCloseSlice";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, IconButton } from "@mui/material";

const Sidebar = ({ hideText, setHideText }) => {
  const dispatch = useDispatch();
  const { SideBarOpen } = useSelector((state) => state.OpenClose);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { logOut } = useLogOut();
  const theme = useTheme();

  const isAdmin = user?.isAdmin || false;
  const sidebarData = isAdmin ? sidebarAdmin : sidebarCustomer;

  const menuItemStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: 2,
    py: 1,
    px: 2,
    mb: 1,
    cursor: "pointer",
    borderRadius: 1,
    bgcolor: window.location.pathname.includes(path)
      ? theme.palette.primary.dark
      : "transparent",
    "&:hover": {
      bgcolor: theme.palette.primary.light,
    },
  });

  return (
    <>
      {SideBarOpen && (
        <Box
          onClick={() => dispatch(toggleSidebar())}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
            display: { sm: "none", xs: "block" },
          }}
        />
      )}

      <Box
        sx={{
          height: "100vh",
          position: "fixed",
          boxShadow: 3,
          zIndex: 1000,
          transition: "all 0.3s ease",
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          width: SideBarOpen ? (hideText ? "80px" : "240px") : "0px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {hideText ? "WA" : "WearMyArt"}
            </Typography>

            <IconButton
              sx={{ display: { sm: "none", xs: "block" } }}
              onClick={() => dispatch(toggleSidebar())}
            >
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            {sidebarData.map((menu) => (
              <Box
                key={menu.name}
                sx={menuItemStyle(menu.path)}
                onClick={() => navigate(`/dashboard${menu.path}`)}
              >
                <menu.icon sx={{ color: theme.palette.primary.contrastText }} />
                {!hideText && (
                  <Typography variant="body2">{menu.name}</Typography>
                )}
              </Box>
            ))}
          </Box>

          <Box sx={{ mb: 2 }}>
            {sidebarBottom.map((menu) => (
              <Box
                key={menu.name}
                sx={menuItemStyle(menu.path)}
                onClick={() =>
                  menu.name === "Log Out"
                    ? logOut()
                    : navigate(`/dashboard${menu.path}`)
                }
              >
                <menu.icon sx={{ color: theme.palette.primary.contrastText }} />
                {!hideText && (
                  <Typography variant="body2">{menu.name}</Typography>
                )}
              </Box>
            ))}

            <Box onClick={() => setHideText(!hideText)} sx={menuItemStyle("")}>
              {hideText ? (
                <KeyboardDoubleArrowRightIcon />
              ) : (
                <KeyboardDoubleArrowLeftIcon />
              )}
              {!hideText && <Typography variant="body2">Minimize</Typography>}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
