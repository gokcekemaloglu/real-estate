import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './app/store.jsx'
import App from './App.jsx'
import ErrorBoundary from "./components/ErrorBoundary.jsx"
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

// Application entry point with strict mode and global error tracking
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>{/* Wrap with global theme context */}
          <App />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
