import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogin = (getMe, setUser) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const login = async (path, payload) => {
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

            if (!res.ok) {
                setIsLoading(false);
                throw new Error(data.message);
            }

            await getMe();
            navigate(path, { replace: true });

            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 600);
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
                setUser(null);

                setTimeout(() => {
                    navigate('/success', { replace: true });
                }, 0);
            }

            return await res.json();
        } catch (err) {
            setError(err.message);
        } finally {
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

            if (!res.ok) {
                setIsLoading(false);
                throw new Error(data.message);
            }

            const isRoleUser = payload.role === 'user';
            const signupPath = isRoleUser ? '/welcome' : '/success';

            await login(signupPath, {
                email: payload.email,
                password: payload.password,
            });

            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 600);
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
