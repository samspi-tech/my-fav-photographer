import { useState } from 'react';
import { Requests } from '../utils/Requests.js';

export const useAvatarUpload = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const UserReq = new Requests(setError, setIsLoading);

    const uploadAvatarOnCloudinary = async (file) => {
        const fileData = new FormData();
        fileData.append('avatar', file);

        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/user/cloud-upload/avatar`,
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

    const handleProfileUpdate = async (userId, payload) => {
        return await UserReq.patch(`user/update/${userId}`, payload);
    };

    return {
        error,
        isLoading,
        uploadAvatarOnCloudinary,
        handleProfileUpdate,
    };
};
