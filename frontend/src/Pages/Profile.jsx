import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Switch,
  Avatar,
  Box,
  Typography,
  Stack,
  Divider,
  TextField,
} from "@mui/material";
import {
  Email,
  Person,
  Lock,
  Edit,
  Save,
  Block,
  CheckCircle,
} from "@mui/icons-material";
import MTooltipButton from "../Components/MTooltipButton";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import OrderListView from "../Components/OrderComponents/OrderListView";
import KeyIcon from "@mui/icons-material/Key";
import ViewListIcon from "@mui/icons-material/ViewList";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [isTwoStepEnabled, setIsTwoStepEnabled] = useState(false);
  const [isUserActive, setIsUserActive] = useState(user?.isActive ?? true);
  const [orderOpen, setOrderOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.FullName || "Unknown User");

  const handleToggleTwoStep = () => {
    setIsTwoStepEnabled((prev) => !prev);
  };

  const handleToggleUserStatus = () => {
    setIsUserActive((prev) => !prev);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const initials = user?.FullName ? getInitials(user.FullName) : "U";

  const navigate = useNavigate();

  const { data: MyOrders = [], isLoading } = useFetchData(
    "MyOrders",
    ApiURLS.GetAllOwnOrders.url,
    ApiURLS.GetAllOwnOrders.method,
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  const handleMyOrder = () => {
    setOrderOpen(true);
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full px-[5vw] mt-15 h-full">
      <div className="w-full p-3 shadow-md flex flex-col xl:flex-row justify-center items-center h-full">
        <div className="w-1/3 h-full flex justify-center items-center">
          <Avatar
            sx={{
              width: 200,
              height: 200,
              bgcolor: "primary.main",
              fontSize: 48,
              fontWeight: "bold",
            }}
          >
            {initials}
          </Avatar>
        </div>

        <div className="w-2/3">
          {user?.isAdmin && (
            <Typography variant="h6" color="error" fontWeight="bold">
              Admin
            </Typography>
          )}

          <Stack spacing={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <Person color="primary" />
              {isEditing ? (
                <TextField
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  variant="outlined"
                  size="small"
                />
              ) : (
                <Typography variant="h6">{fullName}</Typography>
              )}
              {isEditing && (
                <MTooltipButton
                  title="Save"
                  variant="contained"
                  color="success"
                  size="small"
                  startIcon={<Save />}
                  onClick={handleSave}
                >
                  Save
                </MTooltipButton>
              )}
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Email color="primary" />
              <Typography variant="body1" color="text.secondary">
                {user?.Email || "No Email Provided"}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Lock color="warning" />
              <Typography variant="body1">
                {isTwoStepEnabled
                  ? "Two-Step Verification Enabled"
                  : "Two-Step Verification Disabled"}
              </Typography>
            </Stack>
            <Switch checked={isTwoStepEnabled} onChange={handleToggleTwoStep} />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              {isUserActive ? (
                <CheckCircle color="success" />
              ) : (
                <Block color="error" />
              )}
              <Typography variant="body1">
                {isUserActive ? "User is Active" : "User is Deactivated"}
              </Typography>
            </Stack>
            <Switch checked={isUserActive} onChange={handleToggleUserStatus} />
          </Box>

          <Divider sx={{ my: 2 }} />

          <div className="flex gap-3 items-center flex-wrap">
            <MTooltipButton
              title="Edit Profile"
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<Edit />}
              onClick={handleEdit}
            >
              Edit Profile
            </MTooltipButton>
            <MTooltipButton
              title="Change Password"
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<KeyIcon />}
              onClick={() => navigate("/forgot-password")}
            >
              Change Password
            </MTooltipButton>
            {!user?.isAdmin && (
              <MTooltipButton
                title="My Orders"
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<ViewListIcon />}
                onClick={handleMyOrder}
              >
                My Orders
              </MTooltipButton>
            )}
          </div>
        </div>
      </div>
      {orderOpen && (
        <div className="w-full mt-[5vh]">
          <OrderListView Orders={MyOrders} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default Profile;
