import React from "react";
import { Avatar, Button, Typography } from "@mui/material";
import MTooltip from "../MTooltip";

const SingleUser = ({ user }) => {
  console.log(user);
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const handleBlockClick = (id, currentBlockStatus) => {
    console.log("User ID:", id, "Current Block Status:", currentBlockStatus);
  };

  const initials = user?.FullName ? getInitials(user.FullName) : "U";
  return (
    <div className="flex gap-10 rounded-lg overflow-hidden p-3 flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 flex justify-end">
        <Avatar
          sx={{
            width: 250,
            height: 250,
            bgcolor: "primary.main",
            fontSize: 48,
            fontWeight: "bold",
            borderRadius: 10,
          }}
        >
          {initials}
        </Avatar>
      </div>

      <div className="p-4 w-full sm:w-2/3 flex flex-col">
        {user?.isAdmin && (
          <Typography variant="h6" color="error" fontWeight="bold">
            Admin
          </Typography>
        )}

        <Typography variant="h5">{user?.FullName || "Unknown User"}</Typography>
        <Typography variant="h6" color="text.secondary">
          {user?.Email || "No Email Provided"}
        </Typography>
        <div className="w-full">
          <MTooltip title={user.isBlocked ? "Unblock" : "Block"}>
            <Button
              variant="contained"
              color={user.isBlocked ? "secondary" : "error"}
              onClick={() => handleBlockClick(user.id, !user.isBlocked)}
              sx={{ mt: 1 }}
              className="w-fit"
            >
              {user.isBlocked ? "Unblock" : "Block"}
            </Button>
          </MTooltip>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
