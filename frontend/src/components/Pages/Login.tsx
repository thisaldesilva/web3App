import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthenticationContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login, errors } = useAuth(); // Destructure errors from useAuth
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(credentials); // Wait for login to complete
    console.log("DATA ->",data)
    
    const role = data.user.role;
    console.log("role -> ", role)
    if(role === 'baker'){
      console.log("Navigate to baker page.....")
      navigate('/baker')
    }
    else{
      console.log("Navigate to the farmer page.....")
      navigate('/farmer')
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={credentials.username}
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
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
        <button type="submit">Login</button>
        <button onClick={() => navigate('/register')}>Register</button>
      </form>
      {errors.form && <p className="error">{errors.form}</p>} {/* Display error message */}
    </div>
  );
}

export default LoginPage;
