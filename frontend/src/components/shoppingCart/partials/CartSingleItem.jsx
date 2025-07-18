import { useContext } from 'react';
import { Button } from 'primereact/button';
import { ListGroup } from 'react-bootstrap';
import { ShoppingCartContext } from '../../../contexts/ShoppingCartContext.jsx';

const CartSingleItem = ({ item }) => {
    const { photo, price, size } = item;
    const { setCartItems } = useContext(ShoppingCartContext);

    const handleRemoveCartItem = (photo) => {
        const items = JSON.parse(localStorage.getItem('cart')) ?? [];
        const updatedCart = items.filter((item) => item.photo !== photo);

        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <ListGroup.Item className="cart-item d-flex gap-3">
            <div className="shop-cart-photo-container w-50">
                <img src={photo} alt="cart-photo" />
            </div>
            <div className="cart-item-body d-flex flex-column justify-content-between w-75">
                <p className="d-flex justify-content-between">
                    <span className="fw-bold">Photo size:</span> {size}
                </p>
                <p className="d-flex justify-content-between">
                    <span className="fw-bold">Price:</span> €{price}
                </p>
                <Button
                    label="Remove item"
                    icon="pi pi-trash"
                    onClick={() => handleRemoveCartItem(photo)}
                    className="d-block me-auto px-1 py-0 shadow-none bg-transparent"
                />
            </div>
        </ListGroup.Item>
    );
};

export default CartSingleItem;
