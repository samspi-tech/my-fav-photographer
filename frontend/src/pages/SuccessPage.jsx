import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.jsx';
import { ProgressSpinner } from 'primereact/progressspinner';
import { saveToSessionStorage } from '../utils/sessionStorage.js';

const SuccessPage = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            saveToSessionStorage('userId', user._id);
            saveToSessionStorage('role', user.role);

            setTimeout(() => {
                user.role === 'user'
                    ? navigate('/following', { replace: true })
                    : navigate('/profile', { replace: true });
            }, 2000);
        } else {
            sessionStorage.clear();
            localStorage.clear();
            setUser(null);

            setTimeout(() => {
                navigate('/', { replace: true });
            }, 2000);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, user]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="d-flex flex-column">
                <p className="mb-0 fw-medium">
                    {user ? 'Logging in...' : 'Logging out...'}
                </p>
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
