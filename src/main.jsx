import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext';
import { AuthProvider } from './context/AuthContext';
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter future={{ v7_relativeSplatPath: true }}>
          <App />
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  </React.StrictMode>,
)

