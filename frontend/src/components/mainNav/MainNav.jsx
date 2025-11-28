import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './MainNav.module.css';
import Logo from '../logo/Logo';

const MainNav = () => {
    return (
        <Navbar expand="lg" data-bs-theme="dark">
            <Container>
                <Logo />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={`me-auto ${styles.navLinksContainer}`}>
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
