import './shoppingCart.css';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ListGroup } from 'react-bootstrap';
import { useContext, useState } from 'react';
import CartSingleItem from './partials/CartSingleItem.jsx';
import CustomMessage from '../customMessage/CustomMessage.jsx';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { totalCheckout } from '../../utils/shoppingCart.js';

const ShoppingCart = () => {
    const navigate = useNavigate();

    const { cartItems, setCartItems } = useContext(ShoppingCartContext);

    const isEmptyCart = cartItems.length === 0;

    const [isVisible, setIsVisible] = useState(false);

    const handleVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    const handleEmptyCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    return (
        <>
            <Button
                text
                icon="pi pi-shopping-cart"
                onClick={handleVisibility}
                className="text-white p-overlay-badge p-1 overflow-visible shadow-none ms-1 me-4"
            >
                <Badge value={cartItems.length} severity="warning"></Badge>
            </Button>
            <Dialog
                visible={isVisible}
                focusOnShow={false}
                header="Shopping Cart"
                onHide={handleVisibility}
                className="custom-dialog"
            >
                {isEmptyCart && <CustomMessage error="Your cart is empty" />}
                {!isEmptyCart && (
                    <p>
                        <span className="fw-bold">Total checkout:</span> €
                        {totalCheckout(cartItems)}
                    </p>
                )}
                {!isEmptyCart && (
                    <div className="d-flex justify-content-between mt-2 mb-3">
                        <Button
                            className="custom-btn"
                            label="Proceed to checkout"
                            onClick={() => navigate('/checkout')}
                        />
                        <Button
                            severity="danger"
                            label="Clear cart"
                            onClick={handleEmptyCart}
                        />
                    </div>
                )}
                <ListGroup>
                    {!isEmptyCart &&
                        cartItems.map((item, index) => {
                            return (
                                <CartSingleItem
                                    item={item}
                                    key={`cart-item-${index}`}
                                />
                            );
                        })}
                </ListGroup>
            </Dialog>
        </>
    );
};

export default ShoppingCart;
