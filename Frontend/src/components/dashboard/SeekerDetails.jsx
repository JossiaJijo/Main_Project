import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const SeekerDetails = () => {
  const [seekers, setSeekers] = useState([]);
  const [error, setError] = useState('');
  const [selectedSeeker, setSelectedSeeker] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchSeekers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Unauthorized: No token found. Please log in.');
          return;
        }
        const response = await axios.get('http://localhost:5000/api/seekers/all-seekers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSeekers(response.data);
      } catch (error) {
        console.error('Error fetching seekers:', error);
        setError('Failed to fetch seekers. Please log in again.');
      }
    };

    fetchSeekers();
  }, []);

  const fetchSeekerStats = async (seekerId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/seekers/stats/${seekerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
      setSelectedSeeker(seekerId);
    } catch (error) {
      console.error('Error fetching seeker stats:', error.response?.data || error.message);
      setError('Failed to fetch seeker statistics.');
    }
  };

  
  
  

  return (
    <>
      <Navbar />
      <div style={styles.pageContainer}>
        <h2 style={styles.heading}>Seeker Details</h2>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.cardContainer}>
          {seekers.map((seeker) => (
            <div key={seeker._id} style={styles.card} onClick={() => fetchSeekerStats(seeker._id)}>
            <h3>{seeker.username}</h3>
            <p><strong>First Name:</strong> {seeker.firstName}</p>
            <p><strong>Last Name:</strong> {seeker.lastName}</p>
            <p><strong>Email:</strong> {seeker.email}</p>
            <p><strong>Contact Number:</strong> {seeker.contactNumber || 'Not provided'}</p>
            <p><strong>Location:</strong> {seeker.location || 'Not provided'}</p>
            
          </div>
          
          ))}
        </div>

        {selectedSeeker && stats && (
          <div style={styles.modal}>
            <h3>Seeker Statistics</h3>
            <p><strong>Proposals Submitted:</strong> {stats.submittedProposals}</p>
            <p><strong>Accepted Proposals:</strong> {stats.acceptedProposals}</p>
            <p><strong>Rejected Proposals:</strong> {stats.rejectedProposals}</p>
            <button onClick={() => setSelectedSeeker(null)} style={styles.closeButton}>Close</button>
          </div>
        )}
      </div>
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Admin Dashboard. All Rights Reserved.</p>
      </footer>
    </>
  );
};

const styles = {
  pageContainer: {
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#2d3e50',
  },
  error: {
    color: 'red',
    fontSize: '16px',
    marginTop: '10px',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'left',
    cursor: 'pointer',
  },
 
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#6c5ce7',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  footer: {
    marginTop: 'auto',
    padding: '20px',
    backgroundColor: '#6c5ce7',
    color: 'white',
    textAlign: 'center',
    width: '100%',
    position: 'fixed',
    bottom: '0',
  },
};

export default SeekerDetails;
