import React, { useEffect, useState } from "react";
import ApiURLS from "../Data/ApiURLS";
import { useFetchData, useApiMutation } from "../utils/apiRequest";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import { Block, LockOpen } from "@mui/icons-material";

const AllUsers = () => {
  const { data: usersData, isLoading } = useFetchData(
    "AllUsers",
    ApiURLS.GetAllUser.url,
    ApiURLS.GetAllUser.method,
    {
      staleTime: 5 * 60 * 1000, // 5 Minutes
      cacheTime: 10 * 60 * 1000, // 10 Minutes
    }
  );

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
  }, [usersData]);

  const blockUserMutation = useApiMutation(
    ApiURLS.BlockUsers.url,
    ApiURLS.BlockUsers.method
  );

  const unBlockUserMutation = useApiMutation(
    ApiURLS.UnblockUsers.url,
    ApiURLS.UnblockUsers.method
  );

  const handleBlockClick = async (id) => {
    await blockUserMutation.mutateAsync({ userIds: [id] });
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, isBlocked: true } : user
      )
    );
  };

  const handleUnBlockClick = async (id) => {
    await unBlockUserMutation.mutateAsync({ userIds: [id] });
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, isBlocked: false } : user
      )
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 ml-[3vw]">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <TableContainer component={Paper} className="p-4">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.FullName}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{user.isAdmin ? "Admin" : "Customer"}</TableCell>
                <TableCell>
                  <div className="block md:hidden">
                    <IconButton
                      color={user.isBlocked ? "primary" : "error"}
                      onClick={() =>
                        user.isBlocked
                          ? handleUnBlockClick(user._id)
                          : handleBlockClick(user._id)
                      }
                    >
                      {user.isBlocked ? <LockOpen /> : <Block />}
                    </IconButton>
                  </div>
                  <div className="hidden md:block">
                    <Button
                      variant="contained"
                      color={user.isBlocked ? "primary" : "error"}
                      onClick={() =>
                        user.isBlocked
                          ? handleUnBlockClick(user._id)
                          : handleBlockClick(user._id)
                      }
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllUsers;
