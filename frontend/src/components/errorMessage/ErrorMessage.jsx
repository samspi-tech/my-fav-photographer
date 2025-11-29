import { Col, Row } from 'react-bootstrap';
import styles from './ErrorMessage.module.css';
import CustomButton from '../customButton/CustomButton';
import { useNavigateHome } from '@/hooks/useNavigateHome';

const ErrorMessage = ({ error }) => {
    const handleNavigateHome = useNavigateHome();

    return (
        <Row className={styles.errorMessage}>
            <Col className="d-flex align-items-center justify-content-center flex-column gap-3">
                <hgroup>
                    <h2>Oops, something went wrong!</h2>
                    <p className="text-center">{error}</p>
                </hgroup>
                <CustomButton text="Home" onClick={handleNavigateHome} />
            </Col>
        </Row>
    );
};

export default ErrorMessage;
