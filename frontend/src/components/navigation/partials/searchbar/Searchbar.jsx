import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import SearchDialog from './partials/searchDialog/SearchDialog.jsx';

const Searchbar = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleIsVisible = () => {
        setIsVisible((prevState) => !prevState);
    };

    return (
        <>
            <Button
                text
                icon="pi pi-search"
                onClick={handleIsVisible}
                tooltip="Search photographers"
                tooltipOptions={{ position: 'bottom' }}
                className="nav-end-icon shadow-none bg-transparent"
            />
            <Dialog
                position="top"
                visible={isVisible}
                focusOnShow={false}
                onHide={handleIsVisible}
                className="custom-dialog"
                content={<SearchDialog handleHide={handleIsVisible} />}
            />
        </>
    );
};

export default Searchbar;
