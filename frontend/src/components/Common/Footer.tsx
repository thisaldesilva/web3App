import React from 'react';
import { useAuth } from '../Auth/AuthenticationContext'; 
import { useNavigate } from 'react-router-dom';

function Footer() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <footer style={{ textAlign: 'center' }}> 
      <button onClick={handleLogout}>Logout</button>
    </footer>
  );
}

export default Footer;