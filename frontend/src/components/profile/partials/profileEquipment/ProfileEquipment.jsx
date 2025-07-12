import { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SingleEquipment from './partials/SingleEquipment.jsx';
import CustomMessage from '../../../customMessage/CustomMessage.jsx';
import { EquipmentContext } from '../../../../contexts/EquipmentContext.jsx';
import { Button } from 'primereact/button';
import EquipmentForm from './partials/EquipmentForm.jsx';
import { Dialog } from 'primereact/dialog';

const ProfileEquipment = ({ userId }) => {
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
            <Row className="justify-content-start gy-5">
                <Col xs={12}>
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
                {isLoading && <CustomMessage error="Loading..." />}
                {!isLoading && error && <CustomMessage error={error} />}
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
                            />
                        );
                    })}
            </Row>
        </Container>
    );
};

export default ProfileEquipment;
