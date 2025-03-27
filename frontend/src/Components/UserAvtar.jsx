import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { LoginData, LogoutData } from "../Data/NavigationData";
import ThemeToggle from "../Theme/ThemeToggle";
import { useNavigate } from "react-router-dom";
import useLogOut from "../utils/Logout";

export default function OpenIconSpeedDial() {
  const { user } = useSelector((state) => state.user);
  const actions = user ? LoginData : LogoutData;
  const navigate = useNavigate();

  const userInitials = user?.FullName
    ? user.FullName.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "";

  const { logOut } = useLogOut();
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 100,
        right: 16,
        zIndex: 1000,
      }}
    >
      <SpeedDial
        ariaLabel="User Actions"
        icon={<Avatar sx={{ bgcolor: "primary.main" }}>{userInitials}</Avatar>}
        onClick={(e) => e.stopPropagation()}
      >
        {actions.map((action) => {
          const ActionIcon = action.icon;
          return (
            <SpeedDialAction
              key={action.name}
              icon={<ActionIcon />}
              tooltipTitle={action.name}
              onClick={() =>
                action.name === "Log Out"
                  ? logOut()
                  : navigate(`${action.path}`)
              }
              onMouseEnter={(e) => e.stopPropagation()}
            />
          );
        })}

        <SpeedDialAction
          key="theme-toggle"
          icon={<ThemeToggle />}
          tooltipTitle="Toggle Theme"
          onClick={(e) => e.stopPropagation()}
        />
      </SpeedDial>
    </Box>
  );
}
