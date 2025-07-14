import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import store from './store/store.js'
import config from './config/config.js'
import setupAxiosInterceptors from './utils/setupAxiosInterceptors.js'
import './index.css'
import App from './App.jsx'
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from './components/ui/sonner.jsx'

// Initialize axios interceptors
setupAxiosInterceptors(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Analytics />
    <Provider store={store}>
      <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
        <App />
        <Toaster />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)
