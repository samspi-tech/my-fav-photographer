import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogin = (getMe, setUser) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const login = async (payload) => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
                {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            const data = await res.json();

            if (res.ok) {
                await getMe();

                setTimeout(() => {
                    navigate('/success', { replace: true });
                }, 600);
            } else {
                throw new Error(data.message);
            }

            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/logout`,
                { credentials: 'include' },
            );

            if (res.ok) {
                sessionStorage.clear();

                setTimeout(() => {
                    navigate('/', { replace: true });
                }, 600);
            }

            return await res.json();
        } catch (err) {
            setError(err.message);
        } finally {
            setUser(null);
            setIsLoading(false);
        }
    };

    const signup = async (payload) => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/user/create`,
                {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            const data = await res.json();

            if (res.ok) {
                navigate('/homepage', { replace: true });
            } else {
                throw new Error(data.message);
            }

            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        error,
        isLoading,
        login,
        logout,
        signup,
    };
};
