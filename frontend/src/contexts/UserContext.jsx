import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getMe = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/me`,
                { credentials: 'include' },
            );

            const data = await res.json();

            if (res.ok) {
                setUser(data.me);
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <UserContext.Provider value={{ error, isLoading, getMe, user }}>
            {children}
        </UserContext.Provider>
    );
};
