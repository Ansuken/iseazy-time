import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TimeApp } from './TimeApp.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TimeApp />
    </BrowserRouter>
  </StrictMode>,
)
