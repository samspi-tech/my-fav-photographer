import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import PageNotFound from './pages/pageNotFound/PageNotFound';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
