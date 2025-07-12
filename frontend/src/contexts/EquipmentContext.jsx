import { createContext, useState } from 'react';
import { Requests } from '../utils/Requests.js';

// eslint-disable-next-line react-refresh/only-export-components
export const EquipmentContext = createContext();

export const EquipmentProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [equipments, setEquipments] = useState(null);

    const EquipmentReq = new Requests(setError, setIsLoading);

    const getEquipment = async (userId) => {
        const data = await EquipmentReq.get(`equipment/${userId}/equipments`);
        setEquipments(data.equipments);

        return data;
    };

    return (
        <EquipmentContext.Provider
            value={{
                error,
                isLoading,
                equipments,
                getEquipment,
            }}
        >
            {children}
        </EquipmentContext.Provider>
    );
};
