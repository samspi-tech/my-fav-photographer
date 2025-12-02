import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllPhotographers } from '@/services/user.service.js';
import { useSearchParams } from 'react-router-dom';

export const usePhotographersQuery = () => {
    const [searchParams] = useSearchParams();
    const username = searchParams.get('username') || '';

    const {
        data,
        isFetching,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['photographers', username],
        queryFn: ({ pageParam }) => {
            return getAllPhotographers({ username, pageParam });
        },
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
