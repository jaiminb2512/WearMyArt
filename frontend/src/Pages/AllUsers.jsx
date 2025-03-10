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

  const handleBlockClick = (id, currentBlockStatus) => {
    console.log("User ID:", id, "Current Block Status:", currentBlockStatus);
  };

  const columns = [
    { field: "FullName", headerName: "FullName", flex: 1 },
    { field: "Email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
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

  const rows = AllUsers.map((user, index) => ({
    id: user._id || index + 1,
    FullName: user.FullName,
    Email: user.Email,
    role: user.isAdmin ? "Admin" : "Customer",
    isBlocked: user.isBlocked || false,
  }));

  return (
    <div className="">
      <MTable columns={columns} rows={rows} isLoading={isLoading} />
    </div>
  );
};

export default AllUsers;
