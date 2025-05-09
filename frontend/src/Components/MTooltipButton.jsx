import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";

const MTooltipButton = ({
  title,
  className = "",
  variant = "contained",
  placement = "bottom",
  color = "primary",
  onClick,
  children,
  arrow = true,
  startIcon = null,
}) => {
  return (
    <Tooltip title={title} arrow={arrow} placement={placement}>
      <Button
        variant={variant}
        color={color}
        className={`${className}`}
        onClick={onClick}
        startIcon={startIcon}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default MTooltipButton;
