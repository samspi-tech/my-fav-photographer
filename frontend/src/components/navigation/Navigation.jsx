import './navigation.css';
import { useContext } from 'react';
import Logo from '../logo/Logo.jsx';
import NavEnd from './partials/NavEnd.jsx';
import { Menubar } from 'primereact/menubar';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext.jsx';
import { photographerNavItems, userNavItems } from './dataSource.jsx';

const Navigation = () => {
    const { user } = useContext(UserContext);

    return (
        <Container fluid={true} className="nav-container">
            <nav className="container">
                <Row>
                    <Col>
                        <Menubar
                            end={<NavEnd user={user} />}
                            model={
                                user && user.role === 'user'
                                    ? userNavItems
                                    : photographerNavItems
                            }
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
