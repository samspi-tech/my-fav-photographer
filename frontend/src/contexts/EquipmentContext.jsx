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

    const createEquipment = async (userId, payload) => {
        return await EquipmentReq.post(`equipment/create/${userId}`, payload);
    };

    const updateEquipment = async (userId, equipmentId, payload) => {
        return await EquipmentReq.patch(
            `equipment/update/${userId}/equipment/${equipmentId}`,
            payload,
        );
    };

    const deleteEquipment = async (userId, equipmentId) => {
        return await EquipmentReq.delete(
            `equipment/delete/${userId}/equipment/${equipmentId}`,
        );
    };

    return (
        <EquipmentContext.Provider
            value={{
                error,
                isLoading,
                equipments,
                getEquipment,
                createEquipment,
                updateEquipment,
                deleteEquipment,
            }}
        >
            {children}
        </EquipmentContext.Provider>
    );
};
