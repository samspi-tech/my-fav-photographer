import SERVER_BASE_URL from '../utils/constants';

export const getAllPhotographers = async () => {
    try {
        const res = await fetch(`${SERVER_BASE_URL}/user/photographers`);
        return await res.json();
    } catch (err) {
        throw new Error(err.message);
    }
};
