import React from "react";
import { Avatar, Button, Typography } from "@mui/material";

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
    <div className="flex gap-6">
      <Avatar
        sx={{
          width: 300,
          height: 300,
          bgcolor: "primary.main",
          fontSize: 60,
          fontWeight: "bold",
        }}
      >
        {initials}
      </Avatar>

      <div className="flex flex-col gap-2 justify-center">
        {user?.isAdmin && (
          <Typography variant="h6" color="error" fontWeight="bold">
            Admin
          </Typography>
        )}

        <Typography variant="h5">{user?.FullName || "Unknown User"}</Typography>
        <Typography variant="h6" color="text.secondary">
          {user?.Email || "No Email Provided"}
        </Typography>
        <Button
          variant="contained"
          color={user.isBlocked ? "secondary" : "error"}
          onClick={() => handleBlockClick(user.id, !user.isBlocked)}
        >
          {user.isBlocked ? "Unblock" : "Block"}
        </Button>
      </div>
    </div>
  );
};

export default SingleUser;
