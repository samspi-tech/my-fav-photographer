import { HiArrowLeft } from 'react-icons/hi2';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './PageNotFound.module.css';
import CustomButton from '@/components/customButton/CustomButton';
import { useNavigateHome } from '@/hooks/useNavigateHome';

const PageNotFound = () => {
    const handleNavigateHome = useNavigateHome();

    return (
        <Container className={styles.container}>
            <Row>
                <Col>
                    <h2>
                        404 <span>|</span> Page Not Found
                    </h2>
                    <CustomButton
                        text="Back"
                        icon={HiArrowLeft}
                        onClick={handleNavigateHome}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default PageNotFound;
