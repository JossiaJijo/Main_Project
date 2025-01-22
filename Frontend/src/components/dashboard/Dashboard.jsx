import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null); // To store user details
  const navigate = useNavigate();

  // Fetch user details (e.g., from token or API)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored on login
        if (!token) {
          navigate('/login'); // Redirect if no token
          return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    navigate('/login'); // Redirect to login
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={styles.container}>
      <h1>Welcome, {user.username}!</h1>
      <h3>Role: {user.role === 'sponsor' ? 'Sponsor' : 'Seeker'}</h3>
      
      {user.role === 'sponsor' ? (
        <div style={styles.section}>
          <h2>Sponsor Dashboard</h2>
          <ul>
            <li>Create Sponsorship Opportunities</li>
            <li>Manage Sponsorship Requests</li>
            <li>View Proposals</li>
          </ul>
        </div>
      ) : (
        <div style={styles.section}>
          <h2>Seeker Dashboard</h2>
          <ul>
            <li>Browse Sponsorship Opportunities</li>
            <li>Submit Proposals</li>
            <li>Track Submissions</li>
          </ul>
        </div>
      )}

      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
    </div>
  );
}

// Simple inline styles
const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px',
  },
  section: {
    marginTop: '20px',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  logoutButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#d9534f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Dashboard;
