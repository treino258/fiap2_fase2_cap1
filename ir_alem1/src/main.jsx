import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';   // ← Add this import
import App from './App.tsx';
import './index.css';   // if you have this file
import { AuthProvider } from './contexts/authContext.tsx';
import { AgendamentoProvider } from './contexts/agendamentoContext.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AgendamentoProvider>
          <App />
        </AgendamentoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);