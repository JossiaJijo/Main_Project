import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SponsorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
        setFormData(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to fetch profile. Please try again.');
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/auth/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!profile) {
    return <h2>Loading profile...</h2>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sponsor Profile</h2>
      {isEditing ? (
        <div style={styles.card}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label>
            Contact Number:
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
          <button onClick={handleUpdate} style={styles.saveButton}>Save</button>
          <button onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</button>
        </div>
      ) : (
        <div style={styles.card}>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>First Name:</strong> {profile.firstName}</p>
          <p><strong>Last Name:</strong> {profile.lastName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Contact Number:</strong> {profile.contactNumber || 'Not provided'}</p>
          <p><strong>Location:</strong> {profile.location || 'Not provided'}</p>
          <button onClick={() => setIsEditing(true)} style={styles.editButton}>Edit</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    minHeight: '100vh',
    maxWidth: '100vw',
    margin: '0 auto',
    textAlign: 'center',
    backgroundImage: "url('/Profile_background.jpeg')", // Replace with the actual image in your public folder
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#00000088', // Fallback color
  },
  card: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent for readability
    textAlign: 'left',
    maxWidth: '500px',
    margin: '50px auto',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: '#2d3e50',
    fontWeight: 'bold',
    fontSize: '28px',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    margin: '10px 0',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  editButton: {
    padding: '10px 15px',
    backgroundColor: '#6c5ce7',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
  saveButton: {
    padding: '10px 15px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    marginRight: '10px',
  },
  cancelButton: {
    padding: '10px 15px',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
};

export default SponsorProfile;
