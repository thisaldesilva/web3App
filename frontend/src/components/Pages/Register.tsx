import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../config/index'; // Import your configuration file

function RegisterPage() {
  const [registrationInfo, setRegistrationInfo] = useState({
    username: '',
    password: '',
    role: 'baker',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const apiBaseUrl = config.apiBaseUrl; // Your API base URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationInfo({ ...registrationInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBaseUrl}/users/register`, registrationInfo);
      navigate('/login'); // Navigate to login page on successful registration
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Failed to register. Please try again.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login'); // Function to navigate back to the login page
  };

  return (
    <div className="register-page">
      <h1>Register as Baker</h1>
      <p>Fill in the details to create a new baker account.</p>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={registrationInfo.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={registrationInfo.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
        <button type="button" onClick={handleBackToLogin}>Back to Login</button> {/* Button to navigate back to login */}
      </form>
    </div>
  );
}

export default RegisterPage;
