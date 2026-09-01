import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CustomCursor from './components/CustomCursor';
import ShaderBackground from './components/ShaderBackground';

export default function App() {
  return (
    <Router>
      {/* Live WebGL shader — fixed behind everything, persists across all sections */}
      <ShaderBackground />

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      <Routes>
        <Route path="/"  element={<LandingPage />} />
        {/* Fallback */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
