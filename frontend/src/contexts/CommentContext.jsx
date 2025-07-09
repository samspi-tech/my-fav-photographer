import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [comments, setComments] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getPostComments = async (postId) => {
        setError('');
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/comment/${postId}/comments`,
                {
                    credentials: 'include',
                },
            );

            const data = await res.json();
            if (!res.ok) throw new Error(`${data.message}`);

            setComments(data.comments);
            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CommentContext.Provider
            value={{
                error,
                isLoading,
                getPostComments,
                comments,
            }}
        >
            {children}
        </CommentContext.Provider>
    );
};
