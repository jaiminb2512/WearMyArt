import React from "react";
import { IconButton } from "@mui/material";
import {
  DarkMode as MoonIcon,
  LightMode as SunIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};

export default ThemeToggle;
