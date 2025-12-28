import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'

const rootContainer = document.getElementById('form_widget');
if (!rootContainer) {
  console.error('Widget container not found')
} else {
  createRoot(rootContainer).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

