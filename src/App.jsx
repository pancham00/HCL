import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { AuthWrapper, useAuth } from './hooks/useAuth';

function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App(){
  return (
    <AuthWrapper>
      <div>
        <Navbar />
        <div className="app">
          <Sidebar />
          <main className="main">
            <Routes>
              <Route path="/" element={<Protected><Dashboard/></Protected>} />
              <Route path="/dashboard" element={<Protected><Dashboard/></Protected>} />
              <Route path="/profile" element={<Protected><Profile/></Protected>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </AuthWrapper>
  )
}
