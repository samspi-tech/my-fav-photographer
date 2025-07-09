import About from './about/About.jsx';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import Searchbar from './searchbar/Searchbar.jsx';
import CreatePost from './createPost/CreatePost.jsx';
import { useLogin } from '../../../hooks/useLogin.js';

const NavEnd = ({ user }) => {
    const { logout } = useLogin();

    return (
        <div className="d-flex align-items-center">
            <Searchbar />
            {user && user.role === 'photographer' && <CreatePost />}
            {user && (
                <Avatar
                    size="large"
                    shape="circle"
                    className="border"
                    image={user.avatar}
                />
            )}
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
