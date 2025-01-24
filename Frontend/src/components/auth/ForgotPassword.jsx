import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../shared/Navbar';

function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
        username,
        newPassword, // Only send necessary fields
      });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };
  

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Reset Password</h2>
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSubmit} style={styles.button}>Reset Password</button>
          {error && <p style={styles.error}>{error}</p>}
          {message && <p style={styles.success}>{message}</p>}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    flexDirection: 'column',
  },
  form: {
    width: '350px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    color: '#2d3e50',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  input: {
    margin: '12px 0',
    padding: '14px',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    backgroundColor: '#f8f9fa',
    outline: 'none',
    transition: 'border-color 0.3s ease-in-out',
  },
  button: {
    margin: '15px 0',
    padding: '14px',
    width: '100%',
    backgroundColor: '#6c5ce7',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  error: { 
    color: 'red', 
    fontSize: '14px', 
    marginTop: '10px' 
  },
  success: {
    color: 'green',
    fontSize: '14px',
    marginTop: '10px',
  },
};

export default ForgotPassword;
