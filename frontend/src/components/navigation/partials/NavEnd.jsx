import { useContext } from 'react';
import About from './about/About.jsx';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import Searchbar from './searchbar/Searchbar.jsx';
import { useLogin } from '../../../hooks/useLogin.js';
import ShoppingCart from '../../shoppingCart/ShoppingCart.jsx';
import { UserContext } from '../../../contexts/UserContext.jsx';

const NavEnd = ({ user, isRoleUser }) => {
    const { setUser } = useContext(UserContext);
    const { logout } = useLogin(null, setUser);

    return (
        <div className="d-flex align-items-center">
            {isRoleUser && <Searchbar />}
            {isRoleUser && <ShoppingCart />}
            {user && <Avatar size="large" shape="circle" image={user.avatar} />}
            <About />
            <Button
                text
                onClick={logout}
                tooltip="Logout"
                icon="pi pi-sign-out"
                className="nav-end-icon shadow-none bg-transparent"
                tooltipOptions={{ position: 'bottom' }}
            />
        </div>
    );
};

export default NavEnd;
