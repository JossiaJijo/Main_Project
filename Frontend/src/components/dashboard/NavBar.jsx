import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Get the stored user role

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      {/* Dynamically change Home link based on role */}
      <Link to={role === 'admin' ? '/admin-home' : '/home'} style={styles.navLink}>Home</Link>
      <Link to="/sponsor-details" style={styles.navLink}>Sponsor Details</Link>
      <Link to="/seeker-details" style={styles.navLink}>Seeker Details</Link>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#6c5ce7',
    padding: '10px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
  logoutButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Navbar;
