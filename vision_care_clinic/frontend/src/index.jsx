import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // This makes sure we are using your new App.jsx file

// This line finds the <div id="root"> in your HTML and tells React
// to render your <App /> component inside of it.
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);