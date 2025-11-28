import { NavLink } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = () => {
    return (
        <NavLink to="/" className={styles.logo}>
            <img src="/logo.png" alt="MyFavPhotographer logo" />
        </NavLink>
    );
};

export default Logo;
