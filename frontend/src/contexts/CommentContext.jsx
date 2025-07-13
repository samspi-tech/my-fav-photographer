import { createContext, useState } from 'react';
import { Requests } from '../utils/Requests.js';

// eslint-disable-next-line react-refresh/only-export-components
export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [comments, setComments] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const CommentReq = new Requests(setError, setIsLoading);

    const getPostComments = async (postId) => {
        const data = await CommentReq.get(`comment/${postId}/comments`);
        setComments(data.comments);

        return data;
    };

    const createComment = async (userId, postId, payload) => {
        return await CommentReq.post(
            `comment/create/${userId}/post/${postId}`,
            payload,
        );
    };

    const updateComment = async (postId, commentId, payload) => {
        return await CommentReq.patch(
            `comment/update/${postId}/comment/${commentId}`,
            payload,
        );
    };

    const deleteComment = async (userId, postId, commentId) => {
        return await CommentReq.delete(
            `comment/delete/${userId}/post/${postId}/comment/${commentId}`,
        );
    };

    return (
        <CommentContext.Provider
            value={{
                error,
                isLoading,
                comments,
                getPostComments,
                createComment,
                updateComment,
                deleteComment,
            }}
        >
            {children}
        </CommentContext.Provider>
    );
};
