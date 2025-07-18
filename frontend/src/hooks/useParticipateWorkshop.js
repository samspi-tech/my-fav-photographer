import { useState } from 'react';
import { Requests } from '../utils/Requests.js';

export const useParticipateWorkshop = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const ParticipateReq = new Requests(setError, setIsLoading);

    const participateWorkshop = async (workshopId, payload) => {
        return await ParticipateReq.post(
            `participant/create/${workshopId}`,
            payload,
        );
    };

    const unsubscribeFromWorkshop = async (workshopId, userId) => {
        return await ParticipateReq.delete(
            `participant/delete/${workshopId}/participant/${userId}`,
        );
    };

    return {
        error,
        isLoading,
        participateWorkshop,
        unsubscribeFromWorkshop,
    };
};
