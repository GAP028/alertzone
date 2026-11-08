import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Point d'entrée : monte l'application React dans la page HTML
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
