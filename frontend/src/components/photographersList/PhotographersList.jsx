import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { usePhotographersQuery } from '@/reactQuery/queries/usePhotographersQuery.js';
import PhotographerCard from './partials/PhotographerCard';
import CustomSpinner from '../customSpinner/CustomSpinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CustomButton from '../customButton/CustomButton';

const PhotographersList = () => {
    const {
        data,
        isFetching,
        error,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = usePhotographersQuery();

    if (error) return <ErrorMessage error={error} />;

    const btnStatus = hasNextPage ? 'Load More' : 'Nothing more to load';
    const btnText = isFetchingNextPage ? 'Loading more...' : btnStatus;

    return (
        <>
            <Row className="py-5 g-3">
                {isFetching && <CustomSpinner />}
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
        </>
    );
};

export default PhotographersList;
