import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { usePhotographersQuery } from '@/reactQuery/queries/usePhotographersQuery.js';
import PhotographerCard from './partials/PhotographerCard';
import CustomSpinner from '../customSpinner/CustomSpinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CustomButton from '../customButton/CustomButton';
import ScrollToTopButton from '../scrollToTopButton/ScrollToTopButton';
import SearchBar from '../searchBar/SearchBar';

const PhotographersList = () => {
    const {
        data,
        error,
        status,
        isFetching,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = usePhotographersQuery();

    if (status === 'pending') return <CustomSpinner />;
    if (status === 'error') return <ErrorMessage error={error.message} />;

    return (
        <>
            <SearchBar
                id="queryPhotographer"
                placeholder="Search by username"
            />
            <Row className="py-5 g-3">
                {data?.pages.map((group, i) => (
                    <React.Fragment key={`photographers-${i}`}>
                        {group.photographers.map((photographer) => (
                            <Col md={6} lg={4} xl={3} key={photographer._id}>
                                <PhotographerCard photographer={photographer} />
                            </Col>
                        ))}
                    </React.Fragment>
                ))}
            </Row>
            <Row>
                <Col xs={12} className="d-flex justify-content-center pb-5">
                    {isFetchingNextPage && (
                        <CustomButton
                            isLoading={true}
                            isDisabled={!hasNextPage || isFetching}
                        />
                    )}
                    {!isFetchingNextPage && hasNextPage && (
                        <CustomButton
                            text="Load More"
                            onClick={fetchNextPage}
                            isDisabled={!hasNextPage || isFetching}
                        />
                    )}
                    {!hasNextPage && <small>No more pages to load.</small>}
                </Col>
            </Row>
            <ScrollToTopButton />
        </>
    );
};

export default PhotographersList;
