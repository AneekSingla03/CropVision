import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check if the user is authenticated in localStorage
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

  // If not logged in, redirect them to the /login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the requested child component (e.g. <Dashboard />)
  return children;
}

export default ProtectedRoute;
