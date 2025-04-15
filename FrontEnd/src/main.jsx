import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import ImageRepair from './pages/ImageRepair.jsx';
import ImageAdjust from './pages/ImageAdjust.jsx';
import HistoryImage from './pages/HistoryImage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/repair" element={<ImageRepair />} />
      <Route path="/adjust" element={<ImageAdjust />} />
      <Route path="/history" element={<HistoryImage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>
);
