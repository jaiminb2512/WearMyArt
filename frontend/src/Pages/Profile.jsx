import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Box, Typography, Stack } from "@mui/material";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);

  // Function to extract initials from the user's full name
  const getInitials = (name) => {
    if (!name) return "U"; // Default to "U" if no name
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const initials = user?.name ? getInitials(user.name) : "U";

  return (
    <Box
      height="100vh"
      bgcolor="background.default"
      className="flex justify-center items-center h-full gap-[5vw]"
    >
      {/* Avatar */}
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

      <div>
        {/* Admin Badge */}
        {user?.isAdmin && (
          <Typography variant="h6" color="error" fontWeight="bold">
            Admin
          </Typography>
        )}

        {/* User Details */}
        <Typography variant="h5">{user?.FullName || "Unknown User"}</Typography>
        <Typography variant="h6" color="text.secondary">
          {user?.Email || "No Email Provided"}
        </Typography>
      </div>
    </Box>
  );
};

export default Profile;
