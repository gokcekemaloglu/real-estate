import * as React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Update state so the next render will show the fallback UI.
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Logs the error details for developer debugging
  componentDidCatch(error, errorInfo) {
    console.log("ErrorBoundary caught an error", error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // Premium UI optimized for the real-estate showcase website
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-800 p-6 text-center">
          <h1 className="text-3xl font-serif tracking-wide mb-2 text-amber-800">Bir Şeyler Ters Gitti</h1>
          <p className="text-sm max-w-md text-slate-500 mb-6 font-light">
            Portföy ekranlarımızı yüklerken beklenmedik bir hata oluştu. Sayfayı yenilemeyi deneyebilir veya ana sayfaya dönebilirsiniz.
          </p>
          <button 
            title='Ana Sayfaya Dön'
            onClick={() => window.location.href = "/"}
            className="px-6 py-2 bg-slate-900 text-amber-400 text-xs tracking-widest uppercase hover:bg-slate-800 transition-all cursor-pointer"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;