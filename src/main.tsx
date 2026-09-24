import React, { Component, ErrorInfo, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#020617',
          color: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '520px', width: '100%', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(15, 23, 42, 0.9)', padding: '2rem', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f87171', marginBottom: '0.75rem' }}>
              Erro ao carregar a aplicação CIIT 2026
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1.5rem', wordBreak: 'break-word' }}>
              {this.state.error?.message || 'Ocorreu uma falha inesperada durante a inicialização.'}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '0.625rem 1.25rem',
                  background: '#d97706',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                Recarregar Página
              </button>
              <button
                onClick={() => {
                  try {
                    localStorage.clear();
                    sessionStorage.clear();
                  } catch (e) {}
                  window.location.reload();
                }}
                style={{
                  padding: '0.625rem 1.25rem',
                  background: '#334155',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Limpar Cache e Reiniciar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
