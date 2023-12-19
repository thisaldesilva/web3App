//import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthenticationContext';
import Main from './components/Common/Main';


function App() {
  
  return (
    <AuthProvider>
      <Router>
        <Main />
      </Router>
    </AuthProvider>
  );
}

export default App;
