import { useState } from 'react';
import { Requests } from '../utils/Requests.js';

export const useParticipateWorkshop = () => {
    const [workshopParticipants, setWorkshopParticipants] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const ParticipateReq = new Requests(setError, setIsLoading);

    const getParticipants = async (workshopId) => {
        const data = await ParticipateReq.get(`participant/${workshopId}`);

        data
            ? setWorkshopParticipants(data.participants)
            : setWorkshopParticipants([]);

        return data;
    };

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
        workshopParticipants,
        getParticipants,
        participateWorkshop,
        unsubscribeFromWorkshop,
    };
};
