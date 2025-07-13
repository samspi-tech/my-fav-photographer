import { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CustomMessage from '../../../customMessage/CustomMessage.jsx';
import { WorkshopContext } from '../../../../contexts/WorkshopContext.jsx';
import SingleWorkshop from './partials/SingleWorkshop.jsx';

const ProfileWorkshop = ({ userId }) => {
    const { error, isLoading, workshops, getWorkshops } =
        useContext(WorkshopContext);

    useEffect(() => {
        getWorkshops(userId);
    }, []);

    return (
        <Container className="mb-5">
            <Row className="justify-content-center">
                <Col lg={6}>
                    {isLoading && (
                        <CustomMessage error="Loading workshops..." />
                    )}
                    {!isLoading && error && <CustomMessage error={error} />}
                    {!isLoading &&
                        !error &&
                        workshops &&
                        workshops.map((workshop) => {
                            const { _id: workshopId } = workshop;

                            return (
                                <SingleWorkshop
                                    key={workshopId}
                                    workshop={workshop}
                                />
                            );
                        })}
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileWorkshop;
