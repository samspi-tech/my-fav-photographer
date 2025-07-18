import { Card } from 'primereact/card';
import { Col, ListGroup } from 'react-bootstrap';
import EquipmentMenu from './EquipmentMenu.jsx';

const SingleEquipment = ({ equipment, index, isActionAllowed }) => {
    const { camera, lens, bag, tripod, other } = equipment;

    const equipmentTitle = (
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="equipment-title mb-0">Equipment {index + 1}</h5>
            {isActionAllowed && <EquipmentMenu equipment={equipment} />}
        </div>
    );

    return (
        <Col md={6} className="d-flex justify-content-center">
            <Card className="equipment-list card" title={equipmentTitle}>
                <ListGroup className="shadow">
                    <ListGroup.Item className="d-flex justify-content-between">
                        <span className="fw-bold text-warning">Camera:</span>{' '}
                        {camera}
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                        <span className="fw-bold text-warning">Lens:</span>{' '}
                        {lens}
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                        <span className="fw-bold text-warning">Bag:</span> {bag}
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                        <span className="fw-bold text-warning">Tripod:</span>{' '}
                        {tripod}
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                        <span className="fw-bold text-warning">Other:</span>{' '}
                        {other}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    );
};

export default SingleEquipment;
