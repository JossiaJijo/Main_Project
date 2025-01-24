import React, { useEffect, useState } from 'react';
import { getMyProposals, acceptProposal, dismissProposal } from '../../services/sponsorService';

const TrackProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await getMyProposals();
        setProposals(response.data);
      } catch (error) {
        console.error('Error fetching proposals:', error);
        setError('Failed to fetch proposals.');
      }
    };
    fetchProposals();
  }, []);

  // Handle accept proposal
  const handleAccept = async (proposalId) => {
    try {
      await acceptProposal(proposalId);
      setProposals((prev) =>
        prev.map((proposal) =>
          proposal.id === proposalId ? { ...proposal, status: 'Accepted' } : proposal
        )
      );
      setSuccess('Proposal accepted successfully and seeker notified.');
      setError('');
    } catch (error) {
      console.error('Error accepting proposal:', error);
      setError('Failed to accept proposal.');
    }
  };

  // Handle dismiss proposal
  const handleDismiss = async (proposalId) => {
    try {
      await dismissProposal(proposalId);
      setProposals((prev) =>
        prev.map((proposal) =>
          proposal.id === proposalId ? { ...proposal, status: 'Dismissed' } : proposal
        )
      );
      setSuccess('Proposal dismissed successfully and seeker notified.');
      setError('');
    } catch (error) {
      console.error('Error dismissing proposal:', error);
      setError('Failed to dismiss proposal.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Track Proposals</h2>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
      {proposals.length > 0 ? (
        proposals.map((proposal) => (
          <div key={proposal.id} style={styles.card}>
            <h3>{proposal.sponsorshipTitle}</h3>
            <p><strong>Description:</strong> {proposal.description}</p>
            <p><strong>Deadline:</strong> {proposal.deadline}</p>
            <p><strong>Message:</strong> {proposal.message}</p>
            <p><strong>Status:</strong> {proposal.status}</p>
            <p><strong>Submitted On:</strong> {new Date(proposal.createdAt).toLocaleString()}</p>
            <div style={styles.buttonContainer}>
              <button
                onClick={() => handleAccept(proposal.id)}
                style={styles.acceptButton}
                disabled={proposal.status === 'Accepted'}
              >
                Accept
              </button>
              <button
                onClick={() => handleDismiss(proposal.id)}
                style={styles.dismissButton}
                disabled={proposal.status === 'Dismissed'}
              >
                Dismiss
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No proposals found.</p>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: '0 auto' },
  card: { padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9', marginBottom: '10px' },
  buttonContainer: { display: 'flex', gap: '10px', marginTop: '10px' },
  acceptButton: { padding: '8px 16px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px' },
  dismissButton: { padding: '8px 16px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px' },
  error: { color: 'red' },
  success: { color: 'green' },
};

export default TrackProposals;
