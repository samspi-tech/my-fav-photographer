import About from './about/About.jsx';
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { useContext, useRef } from 'react';
import Searchbar from './searchbar/Searchbar.jsx';
import { useLogin } from '../../../hooks/useLogin.js';
import ShoppingCart from '../../shoppingCart/ShoppingCart.jsx';
import { UserContext } from '../../../contexts/UserContext.jsx';

const NavEnd = ({ user, isRoleUser }) => {
    const configMenu = useRef(null);
    const { setUser } = useContext(UserContext);
    const { logout } = useLogin(null, setUser);

    const items = [
        {
            label: 'Settings',
            icon: 'pi pi-cog',
            url: '/settings',
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: logout,
        },
    ];

    const userItems = [
        {
            label: 'Following',
            icon: 'pi pi-camera',
            url: '/following',
        },
        ...items,
    ];

    const photographerItems = [
        {
            label: 'Profile',
            icon: 'pi pi-user',
            url: '/profile',
        },
        ...items,
    ];

    return (
        <div className="d-flex align-items-center">
            {isRoleUser && <Searchbar />}
            {isRoleUser && <ShoppingCart />}
            <div className="d-flex align-items-center">
                <Menu
                    popup
                    ref={configMenu}
                    id="config_menu"
                    className="custom-menu"
                    model={isRoleUser ? userItems : photographerItems}
                />
                <button
                    className="p-panel-header-icon p-link ms-2"
                    onClick={(e) => configMenu?.current?.toggle(e)}
                >
                    {user && (
                        <Avatar
                            size="large"
                            shape="circle"
                            image={user.avatar}
                        />
                    )}
                </button>
            </div>
            <About />
        </div>
    );
};

export default NavEnd;
