import React from 'react';
import AccessDenied from './NavigationError'; // Import the AccessDenied component

const ProtectedRoute = ({ children, allowedTable }) => {
  const userTable = localStorage.getItem('user_table'); 
  
  // Check kung tugma ang `user_table` sa `allowedTable`
  if (userTable !== allowedTable) {
    return <AccessDenied />; // Render AccessDenied component
  }

  return children; // Render the children kung authorized
};

export default ProtectedRoute;
