import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
          borderRadius: '15px',
          margin: '2rem',
          border: '2px solid #f44336'
        }}>
          <h2 style={{ color: '#d32f2f', marginBottom: '1rem' }}>
            Oops! Something went wrong
          </h2>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #f44336, #d32f2f)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 20px rgba(244, 67, 54, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Refresh Page
          </button>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '1rem', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', color: '#d32f2f' }}>
                Error Details (Development)
              </summary>
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '1rem', 
                borderRadius: '5px',
                overflow: 'auto',
                fontSize: '0.8rem',
                marginTop: '0.5rem'
              }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
