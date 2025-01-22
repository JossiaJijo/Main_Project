import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../shared/Footer';

const SponsorDashboard = () => {
  const navigate = useNavigate();

  // Check authentication status on component load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/', { replace: true }); // Redirect to main home page if not authenticated
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear authentication token
    navigate('/', { replace: true }); // Redirect to main home page and replace history
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Sponsor Dashboard</h1>
        <nav style={styles.navbar}>
          <Link to="/sponsor-dashboard" style={styles.link}>
            Dashboard Home
          </Link>
          <Link to="/sponsor-dashboard/add-sponsorship" style={styles.link}>
            Add Sponsorship
          </Link>
          <Link to="/sponsor-dashboard/manage-sponsorship" style={styles.link}>
            Manage Sponsorship
          </Link>
          <Link to="/sponsor-dashboard/track-proposals" style={styles.link}>
            Track Proposals
          </Link>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
  },
  header: {
    width: '100%',
    backgroundColor: '#6c5ce7', // Changed navbar color
    color: '#fff',
    padding: '10px 0',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    margin: '10px 0',
    color: '#fff',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    padding: '10px',
    backgroundColor: '#6c5ce7', // Changed navbar color
    color: '#fff',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  mainContent: {
    width: '90%',
    maxWidth: '1200px',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fff', // Changed to white
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    flex: 1,
  },
  footer: {
    width: '100%',
    backgroundColor: '#6c5ce7', // Changed footer color to match navbar
    color: '#fff',
    textAlign: 'center',
    padding: '10px 0',
    marginTop: 'auto', // Ensures footer stays at the bottom
  },
};

export default SponsorDashboard;
