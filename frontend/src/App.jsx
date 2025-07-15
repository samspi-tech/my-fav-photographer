import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import PhotographerPage from './pages/PhotographerPage.jsx';
import SuccessPage from './pages/SuccessPage.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route index path="/" element={<LoginPage />} />
                <Route index path="/success" element={<SuccessPage />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                    path="photographer/:photographerId"
                    element={<PhotographerPage />}
                />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
