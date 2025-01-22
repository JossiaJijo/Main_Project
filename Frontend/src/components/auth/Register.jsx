import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    contactNumber: '',
    location: '',
    role: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Register</h2>
        <div style={styles.form}>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            style={styles.input}
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            style={styles.input}
          >
            <option value="">Select Role</option>
            <option value="sponsor">Sponsor</option>
            <option value="seeker">Seeker</option>
          </select>
          <button onClick={handleRegister} style={styles.button}>Register</button>
          {error && <p style={styles.error}>{error}</p>}
        </div>
        <div style={styles.linkContainer}>
          <p>
            Already have an account?{' '}
            <Link to="/login" style={styles.link}>Login</Link>
          </p>
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
    borderRadius: '10px',
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
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '14px',
    backgroundColor: '#f8f9fa',
    outline: 'none',
    transition: 'border-color 0.3s ease-in-out',
  },
  button: {
    margin: '10px 0',
    padding: '14px',
    width: '100%',
    backgroundColor: '#6c5ce7',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '10px',
  },
  link: {
    color: '#6c5ce7',
    textDecoration: 'underline',
    fontSize: '14px',
  },
  linkContainer: {
    marginTop: '15px',
  },
};

export default Register;
