import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
