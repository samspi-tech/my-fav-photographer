import { createContext, useState } from 'react';
import { Requests } from '../utils/Requests.js';

// eslint-disable-next-line react-refresh/only-export-components
export const WorkshopContext = createContext();

export const WorkshopProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [workshops, setWorkshops] = useState(null);

    const WorkshopReq = new Requests(setError, setIsLoading);

    const getWorkshops = async (userId) => {
        const data = await WorkshopReq.get(`workshop/${userId}/workshops`);
        setWorkshops(data.workshops);

        return data;
    };

    const createWorkshop = async (userId, payload) => {
        return await WorkshopReq.post(`workshop/create/${userId}`, payload);
    };

    const updateWorkshop = async (userId, workshopId, payload) => {
        return await WorkshopReq.patch(
            `workshop/update/${userId}/workshop/${workshopId}`,
            payload,
        );
    };

    const deleteWorkshop = async (userId, workshopId) => {
        return await WorkshopReq.delete(
            `workshop/delete/${userId}/workshop/${workshopId}`,
        );
    };

    return (
        <WorkshopContext.Provider
            value={{
                error,
                isLoading,
                workshops,
                getWorkshops,
                createWorkshop,
                updateWorkshop,
                deleteWorkshop,
            }}
        >
            {children}
        </WorkshopContext.Provider>
    );
};
