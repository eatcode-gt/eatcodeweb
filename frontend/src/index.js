import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './global/index.css';
const container = document.getElementById('root');
const root = createRoot(container);

// Imports google's library (can't import the usual way cuz we're using React)
// const script = document.createElement('script');
// script.src = "https://accounts.google.com/gsi/client";
// script.async = true;
// document.body.appendChild(script);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);