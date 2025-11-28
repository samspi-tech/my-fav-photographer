import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/errorFallback/ErrorFallback.jsx';
import { navigateToHomepage } from './utils/globalHelpers.js';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary
            onReset={navigateToHomepage}
            FallbackComponent={ErrorFallback}
        >
            <App />
        </ErrorBoundary>
    </StrictMode>
);
