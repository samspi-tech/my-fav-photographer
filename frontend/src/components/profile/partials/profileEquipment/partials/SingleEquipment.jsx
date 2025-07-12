import { Card } from 'primereact/card';
import { Col, ListGroup } from 'react-bootstrap';
import EquipmentMenu from './EquipmentMenu.jsx';

const SingleEquipment = ({ equipment, index }) => {
    const { camera, lens, bag, tripod, other } = equipment;

    return (
        <Col md={6} lg={4} xl={3} className="d-flex justify-content-center">
            <Card className="equipment-list shadow position-relative">
                <h5 className="fw-bold mb-3">Equipment {index + 1}</h5>
                <EquipmentMenu equipment={equipment} />
                <ListGroup className="shadow">
                    <ListGroup.Item>
                        <span className="fw-bold">Camera:</span> {camera}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="fw-bold">Lens:</span> {lens}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="fw-bold">Bag:</span> {bag}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="fw-bold">Tripod:</span> {tripod}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="fw-bold">Other:</span> {other}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    );
};

export default SingleEquipment;
