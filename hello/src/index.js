import React from 'react';
import ReactDOM from 'react-dom/client';  // Important: Use 'react-dom/client' instead
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
