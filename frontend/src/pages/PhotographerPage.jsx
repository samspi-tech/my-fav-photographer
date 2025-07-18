import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BaseLayout from '../baseLayout/BaseLayout.jsx';
import Profile from '../components/profile/Profile.jsx';
import { UserContext } from '../contexts/UserContext.jsx';
import CustomMessage from '../components/customMessage/CustomMessage.jsx';

const PhotographerPage = () => {
    const { photographerId } = useParams();

    const { error, isLoading, getSinglePhotographer, singlePhotographer } =
        useContext(UserContext);

    useEffect(() => {
        getSinglePhotographer(photographerId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photographerId]);

    return (
        <BaseLayout>
            <Container>
                <Row className="d-flex flex-column align-items-center justify-content-center">
                    {isLoading && (
                        <Col lg={6} className="my-5">
                            <CustomMessage
                                loading={true}
                                error="Loading photographer profile..."
                            />
                        </Col>
                    )}{' '}
                    {!isLoading && error && (
                        <Col lg={6} className="my-5">
                            <CustomMessage error={error} />{' '}
                        </Col>
                    )}
                </Row>
            </Container>
            {!isLoading && !error && singlePhotographer && (
                <Profile user={singlePhotographer} />
            )}
        </BaseLayout>
    );
};

export default PhotographerPage;
