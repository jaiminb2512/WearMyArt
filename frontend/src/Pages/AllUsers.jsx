import React, { useState } from "react";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import { Button } from "@mui/material";
import MTable from "../Components/MTable";

const AllUsers = () => {
  const [tableView, setTableView] = useState(false);
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
    <div className="flex-1 flex flex-col ">
      <div className="sticky top-15 w-full z-10 hidden  sm:block shadow-2xl">
        <div className=" hidden sm:flex gap-1 items-center w-full ml-2 px-[5vw] backdrop-blur-3xl pt-3 pb-2">
          <Button
            variant="contained"
            className="w-[fit-content]"
            onClick={() => setTableView(!tableView)}
          >
            {tableView ? "Grid View" : "Table View"}
          </Button>
        </div>
      </div>
      <MTable columns={columns} rows={rows} isLoading={isLoading} />
    </div>
  );
};

export default AllUsers;
