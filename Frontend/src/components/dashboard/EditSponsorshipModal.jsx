import React, { useState } from 'react';
import { updateSponsorship } from '../../services/sponsorService';

const EditSponsorshipModal = ({ sponsorship, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: sponsorship.title,
    description: sponsorship.description,
    deadline: sponsorship.deadline.split('T')[0], // Format for input[type="date"]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateSponsorship(sponsorship._id, formData);
      onUpdate(response.data.sponsorship);
    } catch (error) {
      console.error('Error updating sponsorship:', error);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Edit Sponsorship</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
          <input
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.saveButton}>Save</button>
          <button type="button" onClick={onClose} style={styles.cancelButton}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '400px', textAlign: 'center' },
  input: { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' },
  textarea: { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd', height: '100px' },
  saveButton: { padding: '10px 15px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', marginRight: '10px' },
  cancelButton: { padding: '10px 15px', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '5px' },
};

export default EditSponsorshipModal;
