import { useState } from 'react';
import { Requests } from '../utils/Requests.js';

export const usePhotosUpload = (files) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const FileUploadRequests = new Requests(setError, setIsLoading);

    const uploadFileOnCloudinary = async () => {
        const fileData = new FormData();
        files.map((file) => fileData.append('photos', file));

        setIsLoading(true);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/photo/cloud-upload/photos`,
                {
                    method: 'POST',
                    body: fileData,
                    credentials: 'include',
                },
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhotosUpload = async (userId, photoDescription) => {
        const uploadedFile = await uploadFileOnCloudinary();

        setIsLoading(true);

        try {
            uploadedFile.photos.map((photo) => {
                const payload = {
                    ...photoDescription,
                    photo,
                };

                return FileUploadRequests.post(
                    `photo/create/${userId}`,
                    payload,
                );
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        error,
        isLoading,
        setIsLoading,
        handlePhotosUpload,
    };
};
