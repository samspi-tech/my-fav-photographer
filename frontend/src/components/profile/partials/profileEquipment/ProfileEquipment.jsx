import { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SingleEquipment from './partials/SingleEquipment.jsx';
import CustomMessage from '../../../customMessage/CustomMessage.jsx';
import { EquipmentContext } from '../../../../contexts/EquipmentContext.jsx';

const ProfileEquipment = ({ userId }) => {
    const { error, isLoading, getEquipment, equipments } =
        useContext(EquipmentContext);

    useEffect(() => {
        getEquipment(userId);
    }, []);

    return (
        <Container className="mb-5">
            <Row className="justify-content-center">
                <Col lg={6}>
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
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileEquipment;
