import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import AboutUs from "./components/home/AboutUs";
import ContactUs from "./components/home/ContactUs";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";

// Sponsor Dashboard Components
import SponsorDashboard from "./components/dashboard/SponsorDashboard";
import SponsorHome from "./components/dashboard/SponsorHome";
import AddSponsorship from "./components/dashboard/AddSponsorship";
import ManageSponsorship from "./components/dashboard/ManageSponsorship";
import TrackProposals from "./components/dashboard/TrackProposals";
import SponsorProfile from "./components/dashboard/SponsorProfile";

// Seeker Dashboard Components
import SeekerDashboard from "./components/dashboard/SeekerDashboard";
import SeekerHome from "./components/dashboard/SeekerHome";
import BrowseOpportunities from "./components/dashboard/BrowseOpportunities";
import TrackSubmissions from "./components/dashboard/TrackSubmissions";
import SeekerProfile from "./components/dashboard/SeekerProfile"; // Import SeekerProfile

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />

      {/* Nested Routes for Sponsor Dashboard */}
      <Route path="/sponsor-dashboard" element={<SponsorDashboard />}>
        <Route index element={<SponsorHome />} /> {/* Default child route */}
        <Route path="add-sponsorship" element={<AddSponsorship />} />
        <Route path="manage-sponsorship" element={<ManageSponsorship />} />
        <Route path="track-proposals" element={<TrackProposals />} />
        <Route path="profile" element={<SponsorProfile />} /> {/* Profile Page */}
      </Route>

      {/* Nested Routes for Seeker Dashboard */}
      <Route path="/seeker-dashboard" element={<SeekerDashboard />}>
        <Route index element={<SeekerHome />} /> {/* Default child route */}
        <Route path="browse-opportunities" element={<BrowseOpportunities />} />
        <Route path="track-submissions" element={<TrackSubmissions />} />
        <Route path="profile" element={<SeekerProfile />} /> {/* Profile Page */}
      </Route>
    </Routes>
  );
};

export default App;
