import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles.css'

// Apply saved theme before first paint to avoid flash
;(function () {
  try {
    const t = localStorage.getItem('portfolio-theme')
    document.documentElement.dataset.theme = t === 'dark' ? 'dark' : 'light'
  } catch {}
})()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
