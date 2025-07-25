import { createContext, useState } from 'react';
import { Requests } from '../utils/Requests.js';

// eslint-disable-next-line react-refresh/only-export-components
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState(null);
    const [photographerPosts, setPhotographerPosts] = useState(null);

    const PostReq = new Requests(setError, setIsLoading);

    const getAllPosts = async (userId) => {
        const data = await PostReq.get(`follower/${userId}/following`);
        setPosts(data.following);

        return data;
    };

    const getPhotographerPosts = async (userId) => {
        const data = await PostReq.get(
            `post/${userId}/posts?page=${page}&pageSize=3`,
        );
        setPhotographerPosts(data);
        setTotalPages(data.totalPages);

        return data;
    };

    const createPost = async (userId, payload) => {
        return await PostReq.post(`post/create/${userId}`, payload);
    };

    const updatePost = async (userId, postId, payload) => {
        return await PostReq.patch(
            `post/update/${userId}/post/${postId}`,
            payload,
        );
    };

    const deletePost = async (userId, postId) => {
        return await PostReq.delete(`post/delete/${userId}/post/${postId}`);
    };

    const votePost = async (type, postId, userId) => {
        return await PostReq.post(`vote/${type}/${postId}`, { userId });
    };

    const deleteVote = async (type, postId, userId) => {
        return await PostReq.delete(
            `vote/delete/${type}/${postId}/user/${userId}`,
        );
    };

    return (
        <PostContext.Provider
            value={{
                error,
                isLoading,
                posts,
                photographerPosts,
                page,
                setPage,
                totalPages,
                getAllPosts,
                getPhotographerPosts,
                createPost,
                updatePost,
                deletePost,
                votePost,
                deleteVote,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
