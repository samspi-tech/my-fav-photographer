import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route index path="/" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
