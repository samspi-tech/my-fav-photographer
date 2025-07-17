import About from './about/About.jsx';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import Searchbar from './searchbar/Searchbar.jsx';
import CreatePost from './createPost/CreatePost.jsx';
import { useLogin } from '../../../hooks/useLogin.js';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext.jsx';
import ShoppingCart from '../../shoppingCart/ShoppingCart.jsx';

const NavEnd = ({ user, isRoleUser }) => {
    const { setUser } = useContext(UserContext);
    const { logout } = useLogin(null, setUser);

    return (
        <div className="d-flex align-items-center">
            {isRoleUser && <Searchbar />}
            {isRoleUser && <ShoppingCart />}
            {!isRoleUser && <CreatePost />}
            {user && <Avatar size="large" shape="circle" image={user.avatar} />}
            <About />
            <Button
                text
                onClick={logout}
                tooltip="Logout"
                icon="pi pi-sign-out"
                className="text-white"
                tooltipOptions={{ position: 'bottom' }}
            />
        </div>
    );
};

export default NavEnd;
