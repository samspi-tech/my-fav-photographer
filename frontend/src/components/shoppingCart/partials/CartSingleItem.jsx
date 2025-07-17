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
        <ListGroup.Item className="d-flex gap-3">
            <div className="shop-cart-photo-container w-50">
                <img src={photo} alt="cart-photo" />
            </div>
            <div className="d-flex flex-column justify-content-between w-75">
                <p>
                    <span className="fw-bold">Photo size:</span> {size}
                </p>
                <p>
                    <span className="fw-bold">Price:</span> €{price}
                </p>
                <Button
                    text
                    onClick={() => handleRemoveCartItem(photo)}
                    icon="pi pi-trash"
                    className="text-black d-block ms-auto shadow-none border-0 bg-transparent"
                />
            </div>
        </ListGroup.Item>
    );
};

export default CartSingleItem;
