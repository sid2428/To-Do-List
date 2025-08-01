
import React from 'react'; // ✅ Required for JSX to compile properly
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // or App.css if you're using that

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

