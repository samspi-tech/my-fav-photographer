import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllPhotographers } from '@/services/user.service.js';

export const usePhotographersQuery = () => {
    const {
        data,
        isFetching,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['photographers'],
        queryFn: getAllPhotographers,
        initialPageParam: 1,
        getNextPageParam: (lastPage, lastPageParam, pageParam) => {
            if (lastPageParam[0].totalPages === pageParam) return undefined;

            return pageParam + 1;
        },
    });

    return {
        data,
        isFetching,
        error,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    };
};
