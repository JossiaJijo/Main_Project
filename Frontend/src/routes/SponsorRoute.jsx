import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const SponsorRoute = () => {
  const role = localStorage.getItem("role");
  return role === "sponsor" ? <Outlet /> : <Navigate to="/" />;
};

export default SponsorRoute;
