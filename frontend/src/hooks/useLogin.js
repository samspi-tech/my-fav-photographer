import { useState } from 'react';

export const useLogin = () => {
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
                console.log('Logged in successfully:', data);
            } else {
                throw new Error(`${data.message}`);
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
    };
};
