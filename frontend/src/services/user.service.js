import { SERVER_BASE_URL } from '@/utils/constants.js';

export const getAllPhotographers = async ({ username, pageParam }) => {
    const res = await fetch(
        `${SERVER_BASE_URL}/user/photographers?username=${username}&page=${pageParam}`
    );

    return res.json();
};
