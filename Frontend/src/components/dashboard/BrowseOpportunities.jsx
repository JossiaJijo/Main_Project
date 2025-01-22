import React, { useEffect, useState } from 'react';
import { getAllSponsorships, submitProposal } from '../../services/seekerService';

const BrowseOpportunities = () => {
  const [sponsorships, setSponsorships] = useState([]); // Initial state as an array
  const [message, setMessage] = useState({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsorships = async () => {
      try {
        const response = await getAllSponsorships();
        if (Array.isArray(response)) {
          setSponsorships(response); // Set sponsorships if valid
          setError('');
        } else {
          setError('Invalid response format.');
        }
      } catch (err) {
        console.error('Error fetching sponsorships:', err);
        setError('Failed to load sponsorship opportunities.');
      } finally {
        setLoading(false);
      }
    };
    fetchSponsorships();
  }, []);

  const handleProposalSubmit = async (sponsorshipId) => {
    if (!message[sponsorshipId] || !message[sponsorshipId].trim()) {
      setError('Proposal message cannot be empty.');
      return;
    }

    try {
      await submitProposal({ sponsorshipId, message: message[sponsorshipId] });
      setSuccess(`Proposal submitted successfully for sponsorship ID: ${sponsorshipId}`);
      setMessage((prev) => ({ ...prev, [sponsorshipId]: '' }));
      setError('');
    } catch (err) {
      console.error('Error submitting proposal:', err);
      setError('Failed to submit the proposal.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Browse Sponsorship Opportunities</h2>
      {loading && <p>Loading opportunities...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}

      <div style={styles.list}>
        {sponsorships.length === 0 ? (
          <p>No sponsorship opportunities available at the moment.</p>
        ) : (
          sponsorships.map((sponsorship) => (
            <div key={sponsorship._id} style={styles.card}>
              <h3>{sponsorship.title}</h3>
              <p>{sponsorship.description}</p>
              <p>
                <strong>Deadline:</strong> {new Date(sponsorship.deadline).toLocaleDateString()}
              </p>
              <textarea
                placeholder="Enter your proposal message"
                value={message[sponsorship._id] || ''}
                onChange={(e) =>
                  setMessage((prev) => ({
                    ...prev,
                    [sponsorship._id]: e.target.value,
                  }))
                }
                style={styles.textarea}
              />
              <button
                onClick={() => handleProposalSubmit(sponsorship._id)}
                style={styles.button}
              >
                Submit Proposal
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: '0 auto' },
  list: { display: 'flex', flexDirection: 'column', gap: '15px' },
  card: {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  textarea: {
    width: '100%',
    marginTop: '10px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: { color: 'red' },
  success: { color: 'green' },
};

export default BrowseOpportunities;
