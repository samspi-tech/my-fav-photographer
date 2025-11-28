import { Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import styles from './AppLayout.module.css';

const AppLayout = () => {
    return (
        <main className={`container ${styles.appLayout}`}>
            <Row>Nav</Row>
            <Row>
                <Outlet />
            </Row>
            <Row className={styles.footer}>footer</Row>
        </main>
    );
};

export default AppLayout;
