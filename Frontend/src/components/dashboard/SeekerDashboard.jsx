import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Footer from "../shared/Footer";

const SeekerDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true }); // Redirect to home page if not authenticated
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem("token");
    // Redirect to home page and replace history
    navigate("/", { replace: true });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Seeker Dashboard</h1>
        <nav style={styles.navbar}>
          <NavLink
            to="/seeker-dashboard"
            style={({ isActive }) => ({
              ...styles.navLink,
              backgroundColor: isActive ? "#6c5ce7" : "#007BFF",
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/seeker-dashboard/browse-opportunities"
            style={({ isActive }) => ({
              ...styles.navLink,
              backgroundColor: isActive ? "#6c5ce7" : "#007BFF",
            })}
          >
            Browse Opportunities
          </NavLink>
          <NavLink
            to="/seeker-dashboard/track-submissions"
            style={({ isActive }) => ({
              ...styles.navLink,
              backgroundColor: isActive ? "#6c5ce7" : "#007BFF",
            })}
          >
            Track Submissions
          </NavLink>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </nav>
      </header>
      <main style={styles.mainContent}>
        <Outlet />
      </main>
      <Footer style={styles.footer} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
  },
  header: {
    width: "100%",
    backgroundColor: "#6c5ce7", // Updated to match SponsorDashboard navbar color
    color: "#fff",
    padding: "10px 0",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    margin: "10px 0",
    color: "#fff", // White color for heading text
  },
  navbar: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "10px",
    backgroundColor: "#6c5ce7", // Blue navbar
    color: "#fff",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
    padding: "8px 16px",
    borderRadius: "5px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  logoutButton: {
    padding: "8px 16px",
    backgroundColor: "#d63031", // Red for logout button
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  mainContent: {
    width: "90%",
    maxWidth: "1200px",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    flex: 1,
  },
  footer: {
    width: "100%",
    backgroundColor: "#6c5ce7", // Blue footer
    color: "#fff",
    textAlign: "center",
    padding: "10px 0",
    marginTop: "auto", // Ensures footer stays at the bottom
  },
};

export default SeekerDashboard;
