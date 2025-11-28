import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './MainNav.module.css';
import Logo from '../logo/Logo';
import { HiHome, HiUser, HiUsers } from 'react-icons/hi2';

const MainNav = () => {
    return (
        <Navbar expand="lg" data-bs-theme="dark">
            <Container>
                <Logo />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={`me-auto ${styles.navLinksContainer}`}>
                        <NavLink to="/">
                            <HiHome />
                            <span>Home</span>
                        </NavLink>
                        <NavLink to="/photographers">
                            <HiUsers />
                            <span>Photographers</span>
                        </NavLink>
                        <NavLink to="profile">
                            <HiUser />
                            <span>Profile</span>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MainNav;
