import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ role }) => {
  const { user } = useSelector((state) => state.user);

  if (role === "guest") {
    return user ? <Navigate to="/" /> : <Outlet />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role === "admin" && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  if (role === "customer" && user.isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRoute;
