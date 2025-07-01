import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeicons/primeicons.css';
import './index.css';
import App from './App.jsx';
import { PrimeReactProvider } from 'primereact/api';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <PrimeReactProvider value={{ unstyled: true }}>
            <App />
        </PrimeReactProvider>
    </StrictMode>,
);
