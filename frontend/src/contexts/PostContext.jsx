import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [photographerPosts, setPhotographerPosts] = useState(null);

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
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getPhotographerPosts = async (userId) => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/post/${userId}/posts`,
                {
                    credentials: 'include',
                },
            );

            const data = await res.json();
            setPhotographerPosts(data.posts);

            if (!res.ok) throw new Error(data.message);

            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const createPost = async (userId, payload) => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/post/create/${userId}`,
                {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            await getAllPosts();
            setIsLoading(false);
            await getPhotographerPosts(userId);
        }
    };

    const deletePost = async (userId, postId) => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/post/delete/${userId}/post/${postId}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
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
            setIsLoading(false);
            await getPhotographerPosts(userId);
        }
    };

    const updatePost = async (userId, postId, payload) => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/post/update/${userId}/post/${postId}`,
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
            if (!res.ok) throw new Error(data.message);

            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            await getAllPosts();
            setIsLoading(false);
            await getPhotographerPosts(userId);
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
            await getPhotographerPosts(userId);
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
            await getPhotographerPosts(userId);
        }
    };

    return (
        <PostContext.Provider
            value={{
                data,
                photographerPosts,
                error,
                isLoading,
                getAllPosts,
                getPhotographerPosts,
                createPost,
                deletePost,
                updatePost,
                votePost,
                deleteVote,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
