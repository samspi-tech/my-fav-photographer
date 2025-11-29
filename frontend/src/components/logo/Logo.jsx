import { NavLink } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = ({ onToggle }) => {
    return (
        <NavLink to="/" className={styles.logo} onClick={onToggle}>
            <img src="/logo.png" alt="MyFavPhotographer logo" />
            <h5>
                <span>My</span>
                <span>Fav</span>
                <span>Photographer</span>
            </h5>
        </NavLink>
    );
};

export default Logo;
