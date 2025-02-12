import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const SeekerRoute = () => {
  const role = localStorage.getItem("role");
  return role === "seeker" ? <Outlet /> : <Navigate to="/" />;
};

export default SeekerRoute;
