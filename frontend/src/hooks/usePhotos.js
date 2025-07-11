import { useState } from 'react';
import { Requests } from '../utils/Requests.js';

export const usePhotos = () => {
    const [error, setError] = useState('');
    const [photos, setPhotos] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const PhotoRequests = new Requests(setError, setIsLoading);

    const getPhotographerPhotos = async (userId) => {
        const data = await PhotoRequests.get(`photo/${userId}/photos`);
        setPhotos(data.photos);
    };

    return {
        error,
        isLoading,
        photos,
        getPhotographerPhotos,
    };
};
