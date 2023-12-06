import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthenticationContext';
import ProtectedRoute from './components/Routes/ProtectedRoutes';
import LoginPage from './components/login';
import BackerPage from './components/Backer';
import FarmerPage from './components/Farmer';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/backer" element={
            <ProtectedRoute allowedRoles={['backer']}>
              <BackerPage />
            </ProtectedRoute>
          } />
          <Route path="/farmer" element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <FarmerPage />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
