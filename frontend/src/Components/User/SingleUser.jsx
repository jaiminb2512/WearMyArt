import React, { useState } from "react";
import { Avatar, Typography } from "@mui/material";
import MTooltipButton from "../MTooltipButton";
import { useUserMutations } from "../../utils/useEntityMutations";

const SingleUser = ({ user }) => {
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const [isBlocked, setIsBlocked] = useState(
    Array.isArray(user?.isBlocked)
      ? user.isBlocked.length > 0
      : Boolean(user?.isBlocked)
  );

  const { handleBlockUser, handleUnBlockUser, isLoading } = useUserMutations(
    (userId, isBlocked) => {
      setIsBlocked(isBlocked);
    }
  );

  const handleBlockClick = () => {
    if (isBlocked) {
      handleUnBlockUser(user);
    } else {
      handleBlockUser(user);
    }
  };

  const initials = user?.FullName ? getInitials(user.FullName) : "U";

  return (
    <div className="flex gap-10 rounded-lg overflow-hidden p-3 flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 flex justify-center md:justify-end">
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

        <div className="flex flex-col justify-center items-center md:items-start h-full">
          <Typography variant="h5">
            {user?.FullName || "Unknown User"}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {user?.Email || "No Email Provided"}
          </Typography>

          <div className="w-full">
            <MTooltipButton
              title={isBlocked ? "Unblock" : "Block"}
              variant="contained"
              color={isBlocked ? "secondary" : "error"}
              onClick={handleBlockClick}
              sx={{ mt: 1 }}
              className="w-fit"
              disabled={isLoading}
            >
              {isLoading
                ? isBlocked
                  ? "Unblocking..."
                  : "Blocking..."
                : isBlocked
                ? "Unblock"
                : "Block"}
            </MTooltipButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
