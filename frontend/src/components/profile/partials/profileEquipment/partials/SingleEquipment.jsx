import { ListGroup } from 'react-bootstrap';
import { Card } from 'primereact/card';

const SingleEquipment = ({ equipment, index }) => {
    const { camera, lens, bag, tripod, other } = equipment;

    return (
        <Card className="equipment-list shadow">
            <h5 className="fw-bold mb-3">Equipment {index + 1}</h5>
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
    );
};

export default SingleEquipment;
