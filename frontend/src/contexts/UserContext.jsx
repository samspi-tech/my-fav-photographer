import { Requests } from '../utils/Requests.js';
import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [photographers, setPhotographers] = useState(null);
    const [singlePhotographer, setSinglePhotographer] = useState(null);

    const UserReq = new Requests(setError, setIsLoading);

    const getMe = async () => {
        const data = await UserReq.get('auth/me');
        setUser(data.me);

        return data;
    };

    const getAllPhotographers = async (fullName = '') => {
        const data = await UserReq.get(
            `user/photographers?fullName=${fullName}&page=${page}&pageSize=4`,
        );
        setPhotographers(data.photographers);
        setTotalPages(data.totalPages);

        return data;
    };

    const getSinglePhotographer = async (photographerId) => {
        const data = await UserReq.get(
            `user/singlePhotographer/${photographerId}`,
        );
        setSinglePhotographer(data.photographer);

        return data;
    };

    return (
        <UserContext.Provider
            value={{
                error,
                isLoading,
                user,
                page,
                setPage,
                totalPages,
                setUser,
                photographers,
                singlePhotographer,
                getMe,
                getAllPhotographers,
                getSinglePhotographer,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
