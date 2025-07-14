import { Col } from 'react-bootstrap';
import { Card } from 'primereact/card';

const SingleAddress = ({ address }) => {
    console.log(address);

    return (
        <Col lg={6}>
            <Card>
                <p>ciao</p>
            </Card>
        </Col>
    );
};

export default SingleAddress;
