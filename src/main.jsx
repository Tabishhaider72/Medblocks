import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { initDb } from './db/sqlJsDb';

const startApp = async () => {
  await initDb(); // Ensure DB is initialized before rendering
  ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

startApp();
