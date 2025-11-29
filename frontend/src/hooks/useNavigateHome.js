import { replace, useNavigate } from 'react-router-dom';

export const useNavigateHome = () => {
    const navigate = useNavigate();

    return () => navigate('/', { replace: true });
};
