import React from "react";
import Tooltip from "@mui/material/Tooltip";

const MTooltip = ({ title, children }) => {
  return (
    <Tooltip title={title} arrow placement="bottom">
      <div className="inline-flex">{children}</div>
    </Tooltip>
  );
};

export default MTooltip;
