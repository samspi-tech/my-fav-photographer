import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiHome, HiUser, HiCamera } from 'react-icons/hi2';
import { Container, Nav, Navbar } from 'react-bootstrap';
import styles from './MainNav.module.css';
import Logo from '../logo/Logo';

const MainNav = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCloseNav = () => {
        if (isExpanded) setIsExpanded(false);
    };

    const handleToggleNav = () => {
        setIsExpanded((prevState) => !prevState);
    };

    return (
        <Navbar
            expand="lg"
            data-bs-theme="dark"
            expanded={isExpanded}
            className={styles.mainNav}
        >
            <Container>
                <Logo onToggle={handleCloseNav} />
                <Navbar.Toggle
                    onClick={handleToggleNav}
                    aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={styles.navLinksContainer}>
                        <NavLink to="/" onClick={handleCloseNav}>
                            <HiHome />
                            <span>Home</span>
                        </NavLink>
                        <NavLink to="/photographers" onClick={handleCloseNav}>
                            <HiCamera />
                            <span>Photographers</span>
                        </NavLink>
                        <NavLink to="profile" onClick={handleCloseNav}>
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
