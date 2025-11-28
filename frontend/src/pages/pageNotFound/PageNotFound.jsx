import { Container } from 'react-bootstrap';
import styles from './PageNotFound.module.css';

const PageNotFound = () => {
    return (
        <Container className={styles.container}>
            <h3>
                404 <span>|</span> Page not found
            </h3>
        </Container>
    );
};

export default PageNotFound;
