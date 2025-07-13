import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Col, Container, Row } from 'react-bootstrap';
import WorkshopForm from './partials/WorkshopForm.jsx';
import { useContext, useEffect, useState } from 'react';
import SingleWorkshop from './partials/SingleWorkshop.jsx';
import CustomMessage from '../../../customMessage/CustomMessage.jsx';
import { WorkshopContext } from '../../../../contexts/WorkshopContext.jsx';
import { getFromSessionStorage } from '../../../../utils/sessionStorage.js';

const ProfileWorkshop = ({ user }) => {
    const loggedInUserRole = getFromSessionStorage('role');
    const isActionAllowed = loggedInUserRole === 'photographer';

    const [isVisible, setIsVisible] = useState(false);
    const handleVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    const { _id: userId } = user;

    const { error, isLoading, workshops, getWorkshops } =
        useContext(WorkshopContext);

    useEffect(() => {
        getWorkshops(userId);
    }, []);

    const initialValues = {
        title: '',
        body: '',
        date: '',
    };

    return (
        <Container className="mb-5">
            {isActionAllowed && (
                <Row className="justify-content-center mb-5">
                    <Col xs={6}>
                        <Button
                            icon="pi pi-plus"
                            label="New workshop"
                            className="custom-btn"
                            onClick={handleVisibility}
                        />
                        <Dialog
                            visible={isVisible}
                            onHide={handleVisibility}
                            header="Create a new workshop"
                        >
                            <WorkshopForm
                                userId={userId}
                                submitFn="create"
                                initialValues={initialValues}
                            />
                        </Dialog>
                    </Col>
                </Row>
            )}
            <Row className="justify-content-center">
                <Col lg={6}>
                    {isLoading && (
                        <CustomMessage error="Loading workshops..." />
                    )}
                    {!isLoading && error && <CustomMessage error={error} />}
                    <Row className="gy-3">
                        {!isLoading &&
                            !error &&
                            workshops &&
                            workshops.map((workshop) => {
                                const { _id: workshopId } = workshop;

                                return (
                                    <SingleWorkshop
                                        user={user}
                                        key={workshopId}
                                        workshop={workshop}
                                        isActionAllowed={isActionAllowed}
                                    />
                                );
                            })}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileWorkshop;
