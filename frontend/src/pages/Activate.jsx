import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Activate = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [activationStatus, setActivationStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleActivate = async () => {
    try {
      await axios.post(`http://localhost:8000/auth/users/activation/`, { uid, token });
      setActivationStatus('success');
      // Redirect to login page after activation
      setTimeout(() => {
        navigate('/login', { replace: true }); // Absolute path with replace option
      }, 2000);
    } catch (error) {
      setActivationStatus('error');
      setErrorMessage('There was an error activating your account. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      {activationStatus === '' && (
        <div>
          <h2>Activate Your Account</h2>
          <p>If you've already clicked the link in your email, proceed by clicking the button below:</p>
          <button onClick={handleActivate} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Activate Account
          </button>
        </div>
      )}

      {activationStatus === 'success' && (
        <p style={{ color: 'green' }}>
          Your account has been activated successfully! Redirecting to login...
        </p>
      )}

      {activationStatus === 'error' && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Activate;
