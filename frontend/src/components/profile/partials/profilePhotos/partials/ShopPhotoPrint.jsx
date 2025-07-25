import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { useContext, useRef, useState } from 'react';
import { ShoppingCartContext } from '../../../../../contexts/ShoppingCartContext.jsx';

const ShopPhotoPrint = ({ photo }) => {
    const { photo: singlePhoto } = photo;
    const { setCartItems } = useContext(ShoppingCartContext);

    const toast = useRef(null);

    const [isVisible, setIsVisible] = useState(false);

    const handleVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    const photoSizes = [
        { size: '30x38', price: '35', key: 'small', photo: singlePhoto },
        { size: '40x50', price: '50', key: 'medium', photo: singlePhoto },
        { size: '50x61', price: '75', key: 'large', photo: singlePhoto },
    ];

    const [selectedSize, setSelectedSize] = useState(photoSizes[1]);

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) ?? [];
        const newCart = [...cart, selectedSize];

        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));

        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Item added to cart',
            life: 3000,
        });
    };

    return (
        <>
            <Toast ref={toast} position="top-center" />
            <Button
                onClick={handleVisibility}
                icon="pi pi-cart-arrow-down"
                className="custom-btn shop-photo-print-btn shadow"
            />
            <Dialog
                visible={isVisible}
                className="custom-dialog"
                header="Choose your print size"
                onHide={handleVisibility}
            >
                <div className="d-flex flex-column flex-md-row gap-3 border rounded p-2">
                    <div className="shop-photo-print-container w-100">
                        <img
                            src={singlePhoto}
                            className="border"
                            alt="photographerPhoto"
                        />
                    </div>
                    <div className="d-flex flex-column gap-3">
                        {photoSizes.map((size) => {
                            return (
                                <div
                                    key={size.key}
                                    className="d-flex align-items-center"
                                >
                                    <RadioButton
                                        inputId={size.key}
                                        name="size"
                                        value={size}
                                        onChange={(e) =>
                                            setSelectedSize(e.value)
                                        }
                                        checked={selectedSize.key === size.key}
                                    />
                                    <label
                                        htmlFor={size.key}
                                        className="d-flex justify-content-between w-100 ms-2 text-nowrap"
                                    >
                                        {size.size} cm
                                        <span className="ms-md-5">
                                            €{size.price}
                                        </span>
                                    </label>
                                </div>
                            );
                        })}
                        <Button
                            label="Add to cart"
                            onClick={handleAddToCart}
                            className="custom-btn mt-auto"
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default ShopPhotoPrint;
