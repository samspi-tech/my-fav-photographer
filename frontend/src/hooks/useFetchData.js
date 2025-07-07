import { useState } from 'react';

export const useFetchData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (route) => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/${route}`,
                {
                    credentials: 'include',
                },
            );

            const data = await res.json();
            setData(data);

            if (!res.ok) throw new Error(data.message);

            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { fetchData, data, error, isLoading };
};
