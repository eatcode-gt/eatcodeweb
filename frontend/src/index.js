import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

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