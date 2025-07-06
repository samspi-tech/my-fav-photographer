import './navigation.css';
import Logo from '../logo/Logo.jsx';
import { Col, Row } from 'react-bootstrap';
import NavEnd from './partials/NavEnd.jsx';
import { navItems } from './dataSource.jsx';
import { Menubar } from 'primereact/menubar';

const Navigation = () => {
    return (
        <nav className="container mt-2">
            <Row>
                <Col>
                    <Menubar
                        end={<NavEnd />}
                        model={navItems}
                        className="d-flex align-items-center"
                        start={<Logo cssClass="nav-logo me-2" />}
                    />
                </Col>
            </Row>
        </nav>
    );
};

export default Navigation;
