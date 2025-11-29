import { Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import styles from './AppLayout.module.css';
import MainNav from '@/components/mainNav/MainNav';
import Footer from '@/components/footer/Footer';

const AppLayout = () => {
    return (
        <div className={styles.appLayout}>
            <MainNav />
            <main className="container">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default AppLayout;
