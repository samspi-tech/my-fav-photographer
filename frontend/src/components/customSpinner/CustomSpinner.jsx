import { Col, Row, Spinner } from 'react-bootstrap';
import styles from './CustomSpinner.module.css';

const CustomSpinner = () => {
    return (
        <Row className={styles.spinnerContainer}>
            <Col className="d-flex align-items-center justify-content-center">
                <Spinner
                    role="status"
                    animation="border"
                    className={styles.spinner}
                />
            </Col>
        </Row>
    );
};

export default CustomSpinner;
