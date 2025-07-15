import { Navigate, Outlet } from 'react-router-dom';
import { getFromSessionStorage } from '../utils/sessionStorage.js';

const ProtectedRoutes = ({ role }) => {
    const userRole = getFromSessionStorage('role');

    return role.includes(userRole) ? <Outlet /> : <Navigate to={'/'} replace />;
};

export default ProtectedRoutes;
