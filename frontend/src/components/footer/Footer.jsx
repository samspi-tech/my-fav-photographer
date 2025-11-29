import { Col, Row } from 'react-bootstrap';
import styles from './Footer.module.css';

const Footer = () => {
    const currYear = new Date().getFullYear();

    return (
        <footer className={`container-fluid ${styles.footer}`}>
            <Row>
                <Col className="d-flex justify-content-center py-1">
                    <small>
                        &copy; Copyright {currYear} &ndash;{' '}
                        <span>MyFavPhotographer</span>
                    </small>
                </Col>
            </Row>
        </footer>
    );
};

export default Footer;
