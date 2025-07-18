import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Col, Container, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import EquipmentForm from './partials/EquipmentForm.jsx';
import SingleEquipment from './partials/SingleEquipment.jsx';
import CustomMessage from '../../../customMessage/CustomMessage.jsx';
import { getFromSessionStorage } from '../../../../utils/sessionStorage.js';
import { EquipmentContext } from '../../../../contexts/EquipmentContext.jsx';

const ProfileEquipment = ({ userId }) => {
    const loggedInUserRole = getFromSessionStorage('role');
    const isActionAllowed = loggedInUserRole === 'photographer';

    const { error, isLoading, getEquipment, equipments } =
        useContext(EquipmentContext);

    useEffect(() => {
        getEquipment(userId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [isVisible, setIsVisible] = useState(false);
    const handleVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    const initialValues = {
        camera: '',
        lens: '',
        bag: '',
        tripod: '',
        other: '',
    };

    return (
        <Container className="mb-5">
            <Row className="flex-column align-items-center justify-content-center gap-3 mb-5">
                {isActionAllowed && (
                    <Col xs={12} lg={6}>
                        <Button
                            icon="pi pi-plus"
                            className="custom-btn"
                            label="Add new equipment"
                            onClick={handleVisibility}
                        />
                        <Dialog
                            visible={isVisible}
                            header="Post a new set"
                            onHide={handleVisibility}
                            className="custom-dialog"
                        >
                            <EquipmentForm
                                userId={userId}
                                submitFn="create"
                                initialValues={initialValues}
                            />
                        </Dialog>
                    </Col>
                )}
                <Col lg={6}>
                    {isLoading && (
                        <CustomMessage
                            loading={true}
                            error="Loading equipments..."
                        />
                    )}
                    {!isLoading && error && <CustomMessage error={error} />}
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={10} lg={7} xl={5}>
                    <Row className="gy-4">
                        {!isLoading &&
                            !error &&
                            equipments &&
                            equipments.map((equipment, index) => {
                                const { _id: equipmentId } = equipment;

                                return (
                                    <SingleEquipment
                                        index={index}
                                        key={equipmentId}
                                        equipment={equipment}
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

export default ProfileEquipment;
