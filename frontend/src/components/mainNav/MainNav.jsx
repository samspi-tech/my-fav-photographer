import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './MainNav.module.css';

const MainNav = () => {
    return (
        <Navbar expand="lg" data-bs-theme="dark">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={`me-auto ${styles.navLinks}`}>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/photographers">Photographers</NavLink>
                        <NavLink to="profile">Profile</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MainNav;
