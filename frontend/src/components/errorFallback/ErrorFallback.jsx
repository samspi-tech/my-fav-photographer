import { Container, Row, Col } from 'react-bootstrap';
import styles from './ErrorFallback.module.css';
import CustomButton from '../customButton/CustomButton';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <Container className={styles.container} role="alert">
            <Row>
                <Col>
                    <hgroup>
                        <h2>Oops, something went wrong!</h2>
                        <pre>error: {error.message}</pre>
                    </hgroup>
                    <CustomButton
                        text="Try again"
                        onClick={resetErrorBoundary}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default ErrorFallback;
