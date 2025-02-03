import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'

// Enable React strict mode for better development experience
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Development-only performance monitoring
if (process.env.NODE_ENV === 'development') {
  // Use more generic names to avoid triggering ad blockers
  performance.mark('app-init')
  
  window.addEventListener('load', () => {
    performance.mark('app-ready')
    performance.measure('app-load-time', 'app-init', 'app-ready')
    const timing = performance.getEntriesByName('app-load-time')[0]
    console.log('Application ready:', timing.duration.toFixed(2), 'ms')
  })
}
