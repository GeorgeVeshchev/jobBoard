import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import JobBoard from './components/JobBoard';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashbord.jsx';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <Navbar />
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<JobBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
