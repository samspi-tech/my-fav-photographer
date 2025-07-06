import './navigation.css';
import Logo from '../logo/Logo.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import NavEnd from './partials/NavEnd.jsx';
import { navItems } from './dataSource.jsx';
import { Menubar } from 'primereact/menubar';

const Navigation = () => {
    return (
        <Container fluid={true} className="nav-container">
            <nav className="container">
                <Row>
                    <Col>
                        <Menubar
                            end={<NavEnd />}
                            model={navItems}
                            className="d-flex align-items-center"
                            start={
                                <Logo cssClass="nav-logo me-5 d-none d-lg-flex" />
                            }
                        />
                    </Col>
                </Row>
            </nav>
        </Container>
    );
};

export default Navigation;
