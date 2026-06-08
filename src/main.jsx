import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from "./components/ErrorBoundary.jsx"
import { ThemeProvider } from './context/ThemeContext.jsx'

// Application entry point with strict mode and global error tracking
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>{/* Wrap with global theme context */}
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
