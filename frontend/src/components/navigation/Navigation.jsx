import './navigation.css';
import { useContext } from 'react';
import Logo from '../logo/Logo.jsx';
import NavEnd from './partials/NavEnd.jsx';
import { Menubar } from 'primereact/menubar';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext.jsx';
import { getFromSessionStorage } from '../../utils/sessionStorage.js';

const Navigation = () => {
    const { user } = useContext(UserContext);

    const loggedInUserRole = getFromSessionStorage('role');
    const isRoleUser = loggedInUserRole === 'user';

    return (
        <Container fluid={true} className="nav-container">
            <nav className="container">
                <Row>
                    <Col>
                        <Menubar
                            end={<NavEnd user={user} isRoleUser={isRoleUser} />}
                            // model={isRoleUser && items}
                            className="d-flex align-items-center"
                            start={
                                <div className="d-flex align-items-center">
                                    <Logo cssClass="nav-logo me-5" />
                                </div>
                            }
                        />
                    </Col>
                </Row>
            </nav>
        </Container>
    );
};

export default Navigation;
