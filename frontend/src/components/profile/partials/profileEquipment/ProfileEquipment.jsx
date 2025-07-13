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
            <Row className="justify-content-center mb-5">
                {isActionAllowed && (
                    <Col xs={12} lg={6}>
                        <Button
                            icon="pi pi-plus"
                            onClick={handleVisibility}
                            className="custom-btn small"
                        />
                        <Dialog
                            visible={isVisible}
                            header="Post a new set"
                            onHide={handleVisibility}
                        >
                            <EquipmentForm
                                userId={userId}
                                submitFn="create"
                                initialValues={initialValues}
                            />
                        </Dialog>
                    </Col>
                )}
                {isLoading && <CustomMessage error="Loading..." />}
                {!isLoading && error && <CustomMessage error={error} />}
            </Row>
            <Row className="justify-content-center gy-5">
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
        </Container>
    );
};

export default ProfileEquipment;
