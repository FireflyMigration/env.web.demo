import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { remult } from 'remult'
import { BrowserRouter } from 'react-router-dom'
import DialogProvider from './components/dialog/dialog-context.tsx'
remult.apiClient.url = '/dataApi'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DialogProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DialogProvider>
  </React.StrictMode>
)
