import React from "react";
import { useApiMutation, useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import { Button } from "@mui/material";
import MTable from "../Components/MTable";

const AllUsers = () => {
  const {
    data: AllUsers = [],
    isLoading,
    refetch,
  } = useFetchData(
    "AllUsers",
    ApiURLS.GetAllUser.url,
    ApiURLS.GetAllUser.method,
    {
      staleTime: 5 * 60 * 1000, // 5 Minutes
      cacheTime: 10 * 60 * 1000, // 10 Minutes
    }
  );

  const blockUserMutation = useApiMutation(
    ApiURLS.BlockUsers.url,
    ApiURLS.BlockUsers.method,
    {
      onSuccess: () => refetch(),
    }
  );

  const unBlockUserMutation = useApiMutation(
    ApiURLS.UnblockUsers.url,
    ApiURLS.UnblockUsers.method,
    {
      onSuccess: () => refetch(),
    }
  );

  const handleBlockClick = async (id) => {
    console.log("Blocking User ID:", id);
    await blockUserMutation.mutateAsync({ userIds: [id] });
  };

  const handleUnBlockClick = async (id) => {
    console.log("Unblocking User ID:", id);
    await unBlockUserMutation.mutateAsync({ userIds: [id] });
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
          onClick={() =>
            params.row.isBlocked
              ? handleUnBlockClick(params.row.id)
              : handleBlockClick(params.row.id)
          }
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
    <div className="flex-1 flex flex-col">
      <MTable columns={columns} rows={rows} isLoading={isLoading} />
    </div>
  );
};

export default AllUsers;
