import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  sidebarCustomer,
  sidebarAdmin,
  sidebarBottom,
} from "../Data/NavigationData";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import useLogOut from "../utils/Logout";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const Sidebar = ({ hideText, setHideText }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
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
    <Box
      sx={{
        height: "100vh",
        position: "fixed",
        boxShadow: 3,
        zIndex: 1000,
        transition: "all 0.3s ease",
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        width: hideText ? "80px" : "240px",
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
        {/* Logo area */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {hideText ? "WA" : "WearMyArt"}
          </Typography>
        </Box>

        {/* Navigation section */}
        <Box sx={{ flexGrow: 1 }}>
          {sidebarData.map((menu) => (
            <Box
              key={menu.name}
              sx={menuItemStyle(menu.path)}
              onClick={() => navigate(`dashboard${menu.path}`)}
            >
              <menu.icon sx={{ color: theme.palette.primary.contrastText }} />
              {!hideText && (
                <Typography variant="body2">{menu.name}</Typography>
              )}
            </Box>
          ))}
        </Box>

        {/* Bottom section */}
        <Box sx={{ mb: 2 }}>
          {sidebarBottom.map((menu) => (
            <Box
              key={menu.name}
              sx={menuItemStyle(menu.path)}
              onClick={() =>
                menu.name === "Log Out"
                  ? logOut()
                  : navigate(`dashboard${menu.path}`)
              }
            >
              <menu.icon sx={{ color: theme.palette.primary.contrastText }} />
              {!hideText && (
                <Typography variant="body2">{menu.name}</Typography>
              )}
            </Box>
          ))}

          {/* Minimize Button - Now Styled Like Other Menu Items */}
          <Box
            onClick={() => setHideText(!hideText)}
            sx={menuItemStyle("")} // Uses the same styling
          >
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
  );
};

export default Sidebar;
