import './checkout.css';
import { useContext, useState } from 'react';
import CheckoutBuy from './partials/CheckoutBuy.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import CheckoutItems from './partials/CheckoutItems.jsx';
import CheckoutAddress from './partials/CheckoutAddress.jsx';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext.jsx';

const Checkout = () => {
    const [address, setAddress] = useState(null);
    const [isError, setIsError] = useState(false);

    const { cartItems, setCartItems } = useContext(ShoppingCartContext);
    const isEmptyCart = cartItems.length === 0;

    return (
        <Container className="checkout-container my-5 d-flex flex-column gap-5">
            <Row className="justify-content-center">
                <Col lg={6}>
                    <h1 className="text-center display-2">Checkout</h1>
                </Col>
            </Row>
            <CheckoutAddress
                address={address}
                setAddress={setAddress}
                setIsError={setIsError}
            />
            <CheckoutItems cartItems={cartItems} isEmptyCart={isEmptyCart} />
            <CheckoutBuy
                isError={isError}
                address={address}
                cartItems={cartItems}
                setIsError={setIsError}
                isEmptyCart={isEmptyCart}
                setCartItems={setCartItems}
            />
        </Container>
    );
};

export default Checkout;
