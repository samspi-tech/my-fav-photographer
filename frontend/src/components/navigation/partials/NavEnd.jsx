import { useState } from 'react';
import About from '../../about/About.jsx';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useLogin } from '../../../hooks/useLogin.js';
import SearchDialog from '../../searchDialog/SearchDialog.jsx';

const NavEnd = ({ user }) => {
    const { logout } = useLogin();
    const [isVisible, setIsVisible] = useState(false);

    const handleIsVisible = () => {
        setIsVisible((prevState) => !prevState);
    };

    return (
        <div className="d-flex align-items-center">
            <About />
            <Button
                text
                icon="pi pi-search"
                onClick={handleIsVisible}
                tooltip="Search photographers"
                tooltipOptions={{ position: 'bottom' }}
                className="text-white shadow-none me-3"
            />
            <Dialog
                position="top"
                visible={isVisible}
                focusOnShow={false}
                onHide={handleIsVisible}
                content={<SearchDialog handleHide={handleIsVisible} />}
            />
            {user && (
                <Avatar
                    size="large"
                    shape="circle"
                    className="border"
                    image={user.avatar}
                />
            )}
            <Button
                text
                onClick={logout}
                tooltip="Logout"
                icon="pi pi-sign-out"
                className="text-white ms-2"
                tooltipOptions={{ position: 'bottom' }}
            />
        </div>
    );
};

export default NavEnd;
