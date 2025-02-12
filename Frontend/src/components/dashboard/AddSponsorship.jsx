import React, { useState } from 'react';
import apiClient from '../../services/apiClient';

const AddSponsorship = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    if (formData.deadline < today) {
      setError('Deadline cannot be set to a past date.');
      return;
    }

    try {
      const response = await apiClient.post('/sponsorships', formData);
      alert(response.data.message);
      setFormData({ title: '', description: '', deadline: '' });
      setError(''); // Clear error after successful submission
    } catch (error) {
      console.error('Error adding sponsorship:', error.response?.data || error.message);
      alert(`Failed to add sponsorship: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Sponsorship</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
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
          min={new Date().toISOString().split('T')[0]} // Prevent past dates selection
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd' },
  textarea: { padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ddd', height: '100px' },
  button: { padding: '10px', backgroundColor: '#6c5ce7', color: '#fff', border: 'none', borderRadius: '5px' },
  error: { color: 'red', fontSize: '14px', marginTop: '5px' },
};

export default AddSponsorship;
