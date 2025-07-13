import { Requests } from '../utils/Requests.js';
import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const PhotoContext = createContext();

export const PhotoProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [photos, setPhotos] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const PhotoRequests = new Requests(setError, setIsLoading);

    const getPhotographerPhotos = async (userId, tag = '') => {
        const data = await PhotoRequests.get(
            `photo/${userId}/photos?tag=${tag}`,
        );
        setPhotos(data.photos);

        return data;
    };

    const updatePhoto = async (userId, photoId, payload) => {
        return await PhotoRequests.patch(
            `photo/update/${userId}/photo/${photoId}`,
            payload,
        );
    };

    const deletePhoto = async (userId, photoId) => {
        return await PhotoRequests.delete(
            `photo/delete/${userId}/photo/${photoId}`,
        );
    };

    return (
        <PhotoContext.Provider
            value={{
                error,
                photos,
                isLoading,
                getPhotographerPhotos,
                updatePhoto,
                deletePhoto,
            }}
        >
            {children}
        </PhotoContext.Provider>
    );
};
