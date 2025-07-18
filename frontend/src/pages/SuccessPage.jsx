import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.jsx';
import { ProgressSpinner } from 'primereact/progressspinner';
import { saveToSessionStorage } from '../utils/sessionStorage.js';

const SuccessPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            saveToSessionStorage('userId', user._id);
            saveToSessionStorage('role', user.role);

            setTimeout(() => {
                user.role === 'user'
                    ? navigate('/homepage', { replace: true })
                    : navigate('/profile', { replace: true });
            }, 2000);
        }
    }, [navigate, user]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="d-flex flex-column">
                <p className="mb-0 fw-medium">Logging in...</p>
                <ProgressSpinner
                    strokeWidth="8"
                    className="w-50"
                    animationDuration=".5s"
                />
            </div>
        </div>
    );
};

export default SuccessPage;
