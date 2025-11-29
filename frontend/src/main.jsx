import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/errorFallback/ErrorFallback.jsx';
import { navigateToHomepage } from './utils/globalHelpers.js';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './reactQuery/queryClient.js';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary
            onReset={navigateToHomepage}
            FallbackComponent={ErrorFallback}
        >
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <App />
            </QueryClientProvider>
        </ErrorBoundary>
    </StrictMode>
);
