import React, { useEffect, useState } from 'react';
import { getMySponsorships, deleteSponsorship, updateSponsorship } from '../../services/sponsorService';
import EditSponsorshipModal from './EditSponsorshipModal';

const ManageSponsorship = () => {
  const [sponsorships, setSponsorships] = useState([]);
  const [selectedSponsorship, setSelectedSponsorship] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch sponsor-specific sponsorships
  useEffect(() => {
    const fetchSponsorships = async () => {
      try {
        const response = await getMySponsorships();
        setSponsorships(response.data);
      } catch (error) {
        console.error('Error fetching sponsorships:', error);
      }
    };
    fetchSponsorships();
  }, []);

  // Handle delete sponsorship
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sponsorship?')) {
      try {
        await deleteSponsorship(id);
        setSponsorships((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        console.error('Error deleting sponsorship:', error);
      }
    }
  };

  // Handle sponsorship update
  const handleUpdate = (updatedSponsorship) => {
    setSponsorships((prev) =>
      prev.map((item) => (item._id === updatedSponsorship._id ? updatedSponsorship : item))
    );
    setShowEditModal(false);
  };

  return (
    <div style={styles.container}>
      <h2>Manage Sponsorships</h2>
      {sponsorships.length > 0 ? (
        sponsorships.map((sponsorship) => (
          <div key={sponsorship._id} style={styles.card}>
            <h3>{sponsorship.title}</h3>
            <p>{sponsorship.description}</p>
            <p><strong>Deadline:</strong> {new Date(sponsorship.deadline).toLocaleDateString()}</p>
            <div style={styles.buttonContainer}>
              <button
                style={styles.editButton}
                onClick={() => {
                  setSelectedSponsorship(sponsorship);
                  setShowEditModal(true);
                }}
              >
                Edit
              </button>
              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(sponsorship._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No sponsorships found.</p>
      )}

      {showEditModal && selectedSponsorship && (
        <EditSponsorshipModal
          sponsorship={selectedSponsorship}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: '0 auto' },
  card: { padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9', marginBottom: '10px' },
  buttonContainer: { display: 'flex', gap: '10px', marginTop: '10px' },
  editButton: { padding: '8px 16px', backgroundColor: '#6c5ce7', color: '#fff', border: 'none', borderRadius: '5px' },
  deleteButton: { padding: '8px 16px', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '5px' },
};

export default ManageSponsorship;
