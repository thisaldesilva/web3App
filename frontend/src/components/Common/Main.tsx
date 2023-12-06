import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ProtectedRoute from '../Routes/ProtectedRoutes';
import LoginPage from '../Pages/Login';
import RegisterPage from '../Pages/Register';
import BakerPage from '../Pages/Baker';
import FarmerPage from '../Pages/Farmer';
import Footer from './Footer';

function Main() {
  const location = useLocation();
  const showFooter = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <div>
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/baker" element={
            <ProtectedRoute allowedRoles={['baker']}>
              <BakerPage />
            </ProtectedRoute>
          } />
          <Route path="/farmer" element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <FarmerPage />
            </ProtectedRoute>
          } />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      {showFooter && <Footer />}
    </div>
  );
}

export default Main;
