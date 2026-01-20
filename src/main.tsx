import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { registerSW } from 'virtual:pwa-register'

// Register service worker with automatic updates
registerSW({
  onNeedRefresh() {
    console.log('PWA update available')
  },
  onOfflineReady() {
    console.log('PWA ready for offline use')
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
