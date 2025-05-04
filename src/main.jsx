import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './Router/Router';
import { Toaster } from 'sonner';
import { UserProvider } from './Context/UserContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <Toaster />
      <App />
    </UserProvider>
  </BrowserRouter>
)
