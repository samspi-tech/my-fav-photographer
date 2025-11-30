import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { usePhotographersQuery } from '@/reactQuery/queries/usePhotographersQuery.js';
import PhotographerCard from './partials/PhotographerCard';
import CustomSpinner from '../customSpinner/CustomSpinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CustomButton from '../customButton/CustomButton';
import ScrollToTopButton from '../scrollToTopButton/ScrollToTopButton';

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

    const btnStatus = hasNextPage ? 'Load More' : 'Nothing more to load';
    const btnText = isFetchingNextPage ? 'Loading more...' : btnStatus;

    return (
        <>
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
                    <CustomButton
                        text={btnText}
                        onClick={() => fetchNextPage()}
                        isDisabled={!hasNextPage || isFetching}
                    />
                </Col>
            </Row>
            <ScrollToTopButton />
        </>
    );
};

export default PhotographersList;
