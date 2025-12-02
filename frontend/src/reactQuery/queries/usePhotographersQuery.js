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
        status,
    } = useInfiniteQuery({
        queryKey: ['photographers'],
        queryFn: getAllPhotographers,
        initialPageParam: 1,
        getNextPageParam: (data, _, pageParam) => {
            const isLastPage = data.totalPages === pageParam;

            return isLastPage ? undefined : pageParam + 1;
        },
    });

    return {
        data,
        error,
        status,
        isFetching,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    };
};
