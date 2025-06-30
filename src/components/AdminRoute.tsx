
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  // In a real application, you would check for a valid JWT
  // and the user's role.
  const isAuthenticated = true; // Replace with actual authentication check
  const isAdmin = true; // Replace with actual role check

  return isAuthenticated && isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
