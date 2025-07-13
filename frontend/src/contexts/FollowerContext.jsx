import { createContext, useState } from 'react';
import { Requests } from '../utils/Requests.js';

// eslint-disable-next-line react-refresh/only-export-components
export const FollowerContext = createContext();

export const FollowerProvider = ({ children }) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [followList, setFollowList] = useState(null);

    const FollowerReq = new Requests(setError, setIsLoading);

    const getFollowers = async (photographerId) => {
        const data = await FollowerReq.get(
            `follower/${photographerId}/followers`,
        );
        setFollowList(data.followers);

        return data;
    };

    const getFollowing = async (userId) => {
        const data = await FollowerReq.get(`follower/${userId}/following`);
        setFollowList(data.following);

        return data;
    };

    const followPhotographer = async (userId, photographerId) => {
        return await FollowerReq.post(`follower/create/${userId}`, {
            photographerId,
        });
    };

    const unfollowPhotographer = async (userId, photographerId) => {
        return await FollowerReq.delete(
            `follower/delete/${userId}/photographer/${photographerId}`,
        );
    };

    return (
        <FollowerContext.Provider
            value={{
                error,
                isLoading,
                followList,
                getFollowers,
                getFollowing,
                followPhotographer,
                unfollowPhotographer,
            }}
        >
            {children}
        </FollowerContext.Provider>
    );
};
