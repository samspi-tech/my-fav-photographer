import { HiArrowLeft } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './PageNotFound.module.css';

const PageNotFound = () => {
    return (
        <Container className={styles.container}>
            <Row>
                <Col>
                    <h2>
                        404 <span>|</span> Page Not Found
                    </h2>
                    <Link to="/" replace>
                        <HiArrowLeft />
                        <span>Back</span>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default PageNotFound;
