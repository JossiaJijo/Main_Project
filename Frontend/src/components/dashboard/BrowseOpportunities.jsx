import React, { useEffect, useState } from 'react';
import { getAllSponsorships, submitProposal } from '../../services/seekerService';

const BrowseOpportunities = () => {
  const [sponsorships, setSponsorships] = useState([]);
  const [message, setMessage] = useState({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsorships = async () => {
      setLoading(true);
      try {
        const data = await getAllSponsorships();
        if (data.length > 0) {
          setSponsorships(data);
          setError('');
        } else {
          setError('No sponsorship opportunities available.');
          setSponsorships([]);
        }
      } catch (err) {
        console.error('Error fetching sponsorships:', err.message);
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
      setSuccess('Proposal submitted successfully!');
      setMessage((prev) => ({ ...prev, [sponsorshipId]: '' }));
  
      // Remove the submitted sponsorship from the list instead of refetching
      setSponsorships((prevSponsorships) =>
        prevSponsorships.filter((sponsorship) => sponsorship._id !== sponsorshipId)
      );
    } catch (err) {
      console.error('Error submitting proposal:', err.message);
      setError('Failed to submit the proposal.');
    }
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Browse Sponsorship Opportunities</h2>
      {loading && <p>Loading opportunities...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {!loading && sponsorships.length === 0 ? (
          <p>No sponsorship opportunities available at the moment.</p>
        ) : (
          sponsorships.map((sponsorship) => (
            <div key={sponsorship._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
              <h3>{sponsorship.title}</h3>
              <p>{sponsorship.description}</p>
              <p>
                <strong>Deadline:</strong> {new Date(sponsorship.deadline).toLocaleDateString()}
              </p>
              <textarea
                placeholder="Enter your proposal message"
                value={message[sponsorship._id] || ''}
                onChange={(e) =>
                  setMessage((prev) => ({ ...prev, [sponsorship._id]: e.target.value }))
                }
                style={{ width: '100%', marginTop: '10px', padding: '10px', borderRadius: '5px' }}
              />
              <button
                onClick={() => handleProposalSubmit(sponsorship._id)}
                style={{
                  marginTop: '10px',
                  padding: '10px',
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                }}
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
