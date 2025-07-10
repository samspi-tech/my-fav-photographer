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

    const createComment = async (userId, postId, payload) => {
        setError('');
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/comment/create/${userId}/post/${postId}`,
                {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            const data = await res.json();
            if (!res.ok) throw new Error(`${data.message}`);

            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
            await getPostComments(postId);
        }
    };

    const updateComment = async (postId, commentId, payload) => {
        setError('');
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/comment/update/${postId}/comment/${commentId}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(payload),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            const data = await res.json();
            if (!res.ok) throw new Error(`${data.message}`);

            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
            await getPostComments(postId);
        }
    };

    const deleteComment = async (userId, postId, commentId) => {
        setError('');
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/comment/delete/${userId}/post/${postId}/comment/${commentId}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            const data = await res.json();
            if (!res.ok) throw new Error(`${data.message}`);

            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
            await getPostComments(postId);
        }
    };

    return (
        <CommentContext.Provider
            value={{
                error,
                isLoading,
                getPostComments,
                createComment,
                updateComment,
                deleteComment,
                comments,
            }}
        >
            {children}
        </CommentContext.Provider>
    );
};
