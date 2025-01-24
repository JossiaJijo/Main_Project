import React, { useEffect, useState } from 'react';
import { getSeekerSubmissions } from '../../services/seekerService';

const TrackSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await getSeekerSubmissions();
        setSubmissions(response.data || []); // Ensure submissions is always an array
        setError('');
      } catch (err) {
        console.error('Error fetching submissions:', err);
        setError('Failed to fetch submissions.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <h2>Loading submissions...</h2>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2>Track Submissions</h2>
      {submissions.length > 0 ? (
        submissions.map((submission, index) => {
          const { id, sponsorshipTitle, description, deadline, status, messageToSeeker, createdAt, sponsorDetails } = submission;

          return (
            <div key={id || index} style={styles.card}>
              <h3>{sponsorshipTitle}</h3>
              <p><strong>Description:</strong> {description}</p>
              <p><strong>Deadline:</strong> {deadline}</p>
              <p><strong>Status:</strong> <span style={statusStyles[status]}>{status}</span></p>
              <p><strong>Submitted At:</strong> {new Date(createdAt).toLocaleString()}</p>
              <p><strong>Message from Sponsor:</strong> {messageToSeeker || 'No message provided.'}</p>
              
              {/* Display sponsor details if status is 'Accepted' and sponsorDetails exist */}
              {status === 'Accepted' && sponsorDetails && (
                <div style={styles.sponsorDetails}>
                  <h4>Sponsor Details</h4>
                  {sponsorDetails.name && <p><strong>Name:</strong> {sponsorDetails.name}</p>}
                  {sponsorDetails.email && <p><strong>Email:</strong> {sponsorDetails.email}</p>}
                  {sponsorDetails.contactNumber && <p><strong>Contact Number:</strong> {sponsorDetails.contactNumber}</p>}
                  {!sponsorDetails.name && !sponsorDetails.email && !sponsorDetails.contactNumber && (
                    <p>No sponsor details available.</p>
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No submissions found.</p>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: '0 auto' },
  card: {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    marginBottom: '10px',
  },
  sponsorDetails: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#e8f5e9',
    borderRadius: '8px',
  },
};

const statusStyles = {
  Pending: { color: 'orange' },
  Accepted: { color: 'green' },
  Dismissed: { color: 'red' },
};

export default TrackSubmissions;
