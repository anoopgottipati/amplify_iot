import React from 'react';
import ReactDOM from 'react-dom/client';  // Import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';  // Your main App component
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter

// Create a root and render your app
const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root
root.render(
  <BrowserRouter>  {/* Wrap your App in BrowserRouter */}
    <App />
  </BrowserRouter>
);
