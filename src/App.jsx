import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { PublicDashboard } from './pages/PublicDashboard';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { Donation } from './pages/Donation';
import { ThemeProvider } from './context/ThemeContext';
import { useVisitTracker } from './hooks/useVisitTracker';
import { Analytics } from './components/Analytics';

function App() {
  useVisitTracker(); // Ativa rastreio de visitas

  return (
    <ThemeProvider>
      <Analytics />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><PublicDashboard /></Layout>} />
            <Route path="/doacao" element={<Layout><Donation /></Layout>} />
            <Route path="/admin/dashboard" element={<Layout><AdminDashboard /></Layout>} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
