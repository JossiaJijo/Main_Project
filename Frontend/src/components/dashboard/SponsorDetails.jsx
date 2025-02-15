import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const SponsorDetails = () => {
  const [sponsors, setSponsors] = useState([]);
  const [error, setError] = useState('');
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Unauthorized: No token found. Please log in.');
          return;
        }
        const response = await axios.get('http://localhost:5000/api/sponsors/all-sponsors', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSponsors(response.data);
      } catch (error) {
        console.error('Error fetching sponsors:', error);
        setError('Failed to fetch sponsors. Please log in again.');
      }
    };

    fetchSponsors();
  }, []);

  const fetchSponsorStats = async (sponsorId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized: No token found.');
        return;
      }
      
      const response = await axios.get(`http://localhost:5000/api/sponsors/stats/${sponsorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setStats(response.data);
      setSelectedSponsor(sponsorId);
    } catch (error) {
      console.error('Error fetching sponsor stats:', error.response?.data || error.message);
      setError('Failed to fetch sponsor statistics.');
    }
  };
  
  return (
    <>
      <Navbar />
      <div style={styles.pageContainer}>
        <h2 style={styles.heading}>Sponsor Details</h2>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.cardContainer}>
          {sponsors.map((sponsor) => (
            <div key={sponsor._id} style={styles.card} onClick={() => fetchSponsorStats(sponsor._id)}>
              <h3>{sponsor.username}</h3>
              <p><strong>First Name:</strong> {sponsor.firstName}</p>
              <p><strong>Last Name:</strong> {sponsor.lastName}</p>
              <p><strong>Email:</strong> {sponsor.email}</p>
              <p><strong>Contact Number:</strong> {sponsor.contactNumber || 'Not provided'}</p>
            <p><strong>Location:</strong> {sponsor.location || 'Not provided'}</p>
            </div>
          ))}
        </div>

        {selectedSponsor && stats && (
          <div style={styles.modal}>
            <h3>Sponsor Statistics</h3>
            <p><strong>Sponsorships Created:</strong> {stats.sponsorshipCount}</p>
            <p><strong>Proposals Received:</strong> {stats.receivedProposals}</p>
            <p><strong>Accepted Proposals:</strong> {stats.acceptedProposals}</p>
            <p><strong>Rejected Proposals:</strong> {stats.rejectedProposals}</p>
            <button onClick={() => setSelectedSponsor(null)} style={styles.closeButton}>Close</button>
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

export default SponsorDetails;
