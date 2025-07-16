import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const ShoppingCart = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    return (
        <>
            <Button
                text
                tooltip="New post"
                icon="pi pi-shopping-cart"
                onClick={handleVisibility}
                tooltipOptions={{ position: 'bottom' }}
                className="text-white shadow-none me-3"
            />
            <Dialog
                visible={isVisible}
                focusOnShow={false}
                header="Shopping Cart"
                onHide={handleVisibility}
                className="custom-dialog"
            ></Dialog>
        </>
    );
};

export default ShoppingCart;
