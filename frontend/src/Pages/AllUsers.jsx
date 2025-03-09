import React, { useState } from "react";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import { Button } from "@mui/material";
import MTable from "../Components/MTable";

const AllUsers = () => {
  const { data: AllUsers = [], isLoading } = useFetchData(
    "AllUsers",
    ApiURLS.GetAllUser.url,
    ApiURLS.GetAllUser.method,
    {
      staleTime: 5 * 60 * 1000, // 5 Minutes
      cacheTime: 10 * 60 * 1000, // 10 Minutes
    }
  );

  console.log(AllUsers);

  // Function to handle block/unblock button click
  const handleBlockClick = (id, currentBlockStatus) => {
    console.log("User ID:", id, "Current Block Status:", currentBlockStatus);
    // Here you would implement the API call to toggle the block status
  };

  const columns = [
    { field: "FullName", headerName: "FullName", width: 250 },
    { field: "Email", headerName: "Email", width: 350 },
    { field: "role", headerName: "Role", width: 250 },
    {
      field: "Actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row.isBlocked ? "primary" : "error"}
          onClick={() => handleBlockClick(params.row.id, !params.row.isBlocked)}
        >
          {params.row.isBlocked ? "Unblock" : "Block"}
        </Button>
      ),
    },
  ];

  // Map products data from API
  const rows = AllUsers.map((user, index) => ({
    id: user._id || index + 1,
    FullName: user.FullName,
    Email: user.Email,
    role: user.isAdmin ? "Admin" : "Customer",
    isBlocked: user.isBlocked || false, // Use the isBlock property from the user data
  }));

  return (
    <div className="">
      <MTable columns={columns} rows={rows} isLoading={isLoading} />
    </div>
  );
};

export default AllUsers;
