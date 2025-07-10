import { useState } from 'react';

export const usePhotos = () => {
    const [error, setError] = useState('');
    const [photos, setPhotos] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getPhotographerPhotos = async (userId) => {
        setError('');
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/photo/${userId}/photos`,
                { credentials: 'include' },
            );

            const data = await res.json();
            setPhotos(data.photos);

            if (!res.ok) throw new Error(data.message);

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
        photos,
        getPhotographerPhotos,
    };
};
