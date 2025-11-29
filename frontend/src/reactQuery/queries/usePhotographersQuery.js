import { useQuery } from '@tanstack/react-query';
import { getAllPhotographers } from '@/services/user.service.js';

export const usePhotographersQuery = () => {
    const { data, isPending, error } = useQuery({
        queryKey: ['photographers'],
        queryFn: getAllPhotographers,
    });

    return {
        data,
        isPending,
        error,
    };
};
