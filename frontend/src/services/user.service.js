import { SERVER_BASE_URL } from '@/utils/constants.js';

export const getAllPhotographers = async ({ pageParam }) => {
    const res = await fetch(
        `${SERVER_BASE_URL}/user/photographers?page=${pageParam}`
    );

    return res.json();
};
