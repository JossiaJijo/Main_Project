import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import SeekerDashboard from "../components/dashboard/SeekerDashboard";
import SeekerHome from "../components/dashboard/SeekerHome";
import BrowseOpportunities from "../components/dashboard/BrowseOpportunities";
import TrackSubmissions from "../components/dashboard/TrackSubmissions";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Seeker Dashboard Routes */}
      <Route
        path="/seeker-dashboard"
        element={
          <ProtectedRoute>
            <SeekerDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<SeekerHome />} />
        <Route path="browse-opportunities" element={<BrowseOpportunities />} />
        
        <Route path="track-submissions" element={<TrackSubmissions />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
