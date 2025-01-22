import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoutes = ({ children, isAuthenticated }) => {
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default PublicRoutes;