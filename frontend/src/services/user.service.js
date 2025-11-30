import { SERVER_BASE_URL } from '@/utils/constants.js';

export const getAllPhotographers = async ({ pageParam }) => {
    try {
        const res = await fetch(
            `${SERVER_BASE_URL}/user/photographers?page=${pageParam}`
        );
        return await res.json();
    } catch (err) {
        throw new Error(err.message);
    }
};
