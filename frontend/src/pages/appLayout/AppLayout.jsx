import { Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import styles from './AppLayout.module.css';
import MainNav from '@/components/mainNav/MainNav';
import Footer from '@/components/footer/Footer';

const AppLayout = () => {
    return (
        <main className={`container ${styles.appLayout}`}>
            <Row>
                <MainNav />
            </Row>
            <Row>
                <Outlet />
            </Row>
            <Row className={styles.footer}>
                <Footer />
            </Row>
        </main>
    );
};

export default AppLayout;
