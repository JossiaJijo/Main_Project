import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id); // Store user ID
      localStorage.setItem('role', user.role);

      navigate(user.role === 'seeker' ? '/seeker-dashboard' : '/sponsor-dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Login</h2>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleLogin} style={styles.button}>Login</button>
          {error && <p style={styles.error}>{error}</p>}
          {/*<p>
            <Link to="/forgot-password" style={styles.link}>Forgot Password?</Link>
          </p>*/}
        </div>
        <div style={styles.linkContainer}>
          <p>
            Not registered?{' '}
            <Link to="/register" style={styles.link}>Sign Up</Link>
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
  link: {
    color: '#6c5ce7',
    textDecoration: 'underline',
    fontSize: '14px',
  },
  linkContainer: {
    marginTop: '15px',
  },
};

export default Login;  