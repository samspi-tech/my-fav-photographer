import { Menu } from 'primereact/menu';
import About from './about/About.jsx';
import { Avatar } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';
import Searchbar from './searchbar/Searchbar.jsx';
import { useContext, useRef, useState } from 'react';
import { useLogin } from '../../../hooks/useLogin.js';
import FollowList from '../../followList/FollowList.jsx';
import ShoppingCart from '../../shoppingCart/ShoppingCart.jsx';
import { UserContext } from '../../../contexts/UserContext.jsx';

const NavEnd = ({ user, isRoleUser }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

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
            command: handleVisibility,
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
        <>
            <div className="d-flex align-items-center">
                {isRoleUser && <Searchbar />}
                {isRoleUser && <ShoppingCart />}
                <div>
                    <Menu
                        popup
                        ref={configMenu}
                        id="config_menu"
                        className="custom-menu"
                        model={isRoleUser ? userItems : photographerItems}
                    />
                    <button
                        className="p-panel-header-icon p-link mx-2"
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
            <Dialog
                visible={isVisible}
                onHide={handleVisibility}
                className="custom-dialog"
                header="Photographers list"
            >
                <FollowList />
            </Dialog>
        </>
    );
};

export default NavEnd;
