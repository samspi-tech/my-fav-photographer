import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import './index.css';
import App from './App.jsx';
import { PrimeReactProvider } from 'primereact/api';
import { UserProvider } from './contexts/UserContext.jsx';
import { PostProvider } from './contexts/PostContext.jsx';
import { CommentProvider } from './contexts/CommentContext.jsx';
import { PhotoProvider } from './contexts/PhotoContext.jsx';
import { EquipmentProvider } from './contexts/EquipmentContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UserProvider>
            <PostProvider>
                <CommentProvider>
                    <PhotoProvider>
                        <EquipmentProvider>
                            <PrimeReactProvider>
                                <App />
                            </PrimeReactProvider>
                        </EquipmentProvider>
                    </PhotoProvider>
                </CommentProvider>
            </PostProvider>
        </UserProvider>
    </StrictMode>,
);
