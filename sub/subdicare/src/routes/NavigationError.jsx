import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationError = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>403 - Access Denied</h1>
      <p>You do not have permission to accass this page.</p>
      <button onClick={handleGoBack} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Go Back
      </button>
    </div>
  );
};

export default NavigationError;
