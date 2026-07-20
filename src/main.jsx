import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store.jsx";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Application entry point with strict mode and global error tracking
createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <ThemeProvider>
          {/* Wrap with global theme context */}
          <App />
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
    
  </ErrorBoundary>,
);
