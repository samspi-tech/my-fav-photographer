import { useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import SearchDialog from '../../searchDialog/SearchDialog.jsx';
import About from '../../about/About.jsx';

const NavEnd = () => {
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
            <Avatar
                image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                shape="circle"
            />
        </div>
    );
};

export default NavEnd;
