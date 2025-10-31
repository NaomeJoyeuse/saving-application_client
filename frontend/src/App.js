import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClientDashboardLayout from './components/ClientLayout';
import Overview from './components/overview';
import Transactions from './pages/transactions.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

         <Route path="/dashboard" element={<ClientDashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={< Overview />} />
          <Route path="transactions" element={< Transactions />} />
        
        </Route> 
      </Routes>
    </Router>
  );
}

export default App;
