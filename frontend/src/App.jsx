import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import PageNotFound from './pages/pageNotFound/PageNotFound';
import Photographers from './pages/photographers/Photographers';
import Profile from './pages/profile/Profile';
import AppLayout from './pages/appLayout/AppLayout';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<Homepage />} />
                    <Route path="/photographers" element={<Photographers />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>

                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
