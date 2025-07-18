import { createContext, useState } from 'react';
import { Requests } from '../utils/Requests.js';

// eslint-disable-next-line react-refresh/only-export-components
export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [addresses, setAddresses] = useState(null);

    const AddressReq = new Requests(setError, setIsLoading);

    const getAddresses = async (userId) => {
        const data = await AddressReq.get(`address/${userId}/addresses`);
        setAddresses(data.addresses);

        return data;
    };

    const createAddress = async (userId, payload) => {
        return await AddressReq.post(`address/create/${userId}`, payload);
    };

    const updateAddress = async (userId, addressId, payload) => {
        return await AddressReq.patch(
            `address/update/${userId}/address/${addressId}`,
            payload,
        );
    };

    const deleteAddress = async (userId, addressId) => {
        return await AddressReq.delete(
            `address/delete/${userId}/address/${addressId}`,
        );
    };

    return (
        <AddressContext.Provider
            value={{
                error,
                isLoading,
                addresses,
                getAddresses,
                createAddress,
                updateAddress,
                deleteAddress,
            }}
        >
            {children}
        </AddressContext.Provider>
    );
};
