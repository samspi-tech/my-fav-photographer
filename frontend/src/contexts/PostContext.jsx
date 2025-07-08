import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getAllPosts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/post`,
                {
                    credentials: 'include',
                },
            );

            const data = await res.json();
            setData(data);

            if (!res.ok) throw new Error(data.message);

            return data;
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const votePost = async (type, postId, userId) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/vote/${type}/${postId}`,
                {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify({ userId }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            return await res.json();
        } catch (err) {
            setError(err.message);
        } finally {
            await getAllPosts();
        }
    };

    const deleteVote = async (type, postId, userId) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/vote/delete/${type}/${postId}/user/${userId}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                },
            );

            return await res.json();
        } catch (err) {
            setError(err.message);
        } finally {
            await getAllPosts();
        }
    };

    return (
        <PostContext.Provider
            value={{
                data,
                error,
                isLoading,
                getAllPosts,
                votePost,
                deleteVote,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
