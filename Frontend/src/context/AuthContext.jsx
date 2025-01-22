import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Ensure this is correctly placed

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const login = (userData, token) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/'); // Redirect after login
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login'); // Redirect after logout
  };

  const handleLogin = () => {
    // Authentication logic
    navigate('/seeker-dashboard'); // Ensure the route exists
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
