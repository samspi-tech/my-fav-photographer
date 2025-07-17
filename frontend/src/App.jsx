import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SuccessPage from './pages/SuccessPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import PhotographerPage from './pages/PhotographerPage.jsx';
import ProtectedRoutes from './middleware/ProtectedRoutes.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route index path="/" element={<LoginPage />} />
                <Route index path="/success" element={<SuccessPage />} />

                <Route element={<ProtectedRoutes role="user" />}>
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route
                        path="photographer/:photographerId"
                        element={<PhotographerPage />}
                    />
                </Route>

                <Route element={<ProtectedRoutes role="photographer" />}>
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>

                <Route
                    element={
                        <ProtectedRoutes role={['user', 'photographer']} />
                    }
                >
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
