import { useContext, useEffect, useState } from 'react';
import BaseLayout from '../baseLayout/BaseLayout.jsx';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { AddressContext } from '../contexts/AddressContext.jsx';
import { getFromSessionStorage } from '../utils/sessionStorage.js';
import { Dropdown } from 'primereact/dropdown';
import SingleAddress from '../components/settings/partials/addresses/partials/SingleAddress.jsx';
import CustomMessage from '../components/customMessage/CustomMessage.jsx';
import CartSingleItem from '../components/shoppingCart/partials/CartSingleItem.jsx';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext.jsx';
import { totalCheckout } from '../utils/shoppingCart.js';
import { Button } from 'primereact/button';
import { CascadeSelect } from 'primereact/cascadeselect';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.jsx';

const CheckoutPage = () => {
    const [address, setAddress] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const { getAddresses, addresses } = useContext(AddressContext);

    const { cartItems, setCartItems } = useContext(ShoppingCartContext);
    const isEmptyCart = cartItems.length === 0;

    const addressList = addresses && addresses.map((address) => address);

    const loggedInUserId = getFromSessionStorage('userId');

    const handlePayment = () => {
        if (!address) {
            return setIsError(true);
        } else {
            setIsError(false);
            setIsLoading(true);

            setTimeout(() => {
                setIsVisible(true);
                setIsLoading(false);
            }, 2000);

            setTimeout(() => {
                navigate('/homepage', { replace: true });
                localStorage.removeItem('cart');
                setCartItems([]);
            }, 4000);
        }
    };

    useEffect(() => {
        getAddresses(loggedInUserId);
    }, []);

    return (
        <BaseLayout>
            <Container className="my-5 d-flex flex-column gap-5">
                <Row className="gy-1">
                    <Col xs={12}>
                        <h1 className="text-center fw-bold">Checkout</h1>
                    </Col>
                    <Col xs={12}>
                        <h3 className="fw-bold">Choose address</h3>
                        <Dropdown
                            value={address}
                            className="w-100"
                            optionLabel="street"
                            options={addressList}
                            placeholder="Select an address"
                            onChange={(e) => setAddress(e.value)}
                        />
                    </Col>
                    <Col xs={12}>
                        {!address && (
                            <CustomMessage error="No address selected" />
                        )}
                        {address && addresses && (
                            <SingleAddress
                                address={address}
                                showMenu={false}
                                addressTitle={`Delivering to ${user.firstName} ${user.lastName}`}
                            />
                        )}
                    </Col>
                </Row>
                <Row className="gy-3">
                    <Col xs={12}>
                        {isEmptyCart && (
                            <CustomMessage error="Your cart is empty" />
                        )}
                        <ListGroup>
                            <h3 className="fw-bold">Your order</h3>
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
                    </Col>
                    {!isEmptyCart && (
                        <Col col={12} className="d-flex flex-column">
                            {isError && (
                                <p className="align-self-end d-flex align-items-center gap-1 text-danger">
                                    <span className="pi pi-exclamation-circle"></span>
                                    Please select an address
                                </p>
                            )}
                            <div className="d-flex justify-content-end align-items-center gap-3">
                                <h3 className="fw-bold">
                                    Paying with Visa 1234
                                </h3>
                                <div className="bg-white text-black p-2">
                                    <p>
                                        <span className="fw-bold me-3">
                                            Order total:
                                        </span>
                                        €{totalCheckout(cartItems)}
                                    </p>
                                    {isLoading ? (
                                        <CascadeSelect
                                            loading
                                            placeholder="Processing..."
                                            className="custom-btn loading-btn w-100"
                                        />
                                    ) : (
                                        <Button
                                            label="Buy now"
                                            onClick={handlePayment}
                                            className="custom-btn w-100"
                                        />
                                    )}
                                </div>
                            </div>
                        </Col>
                    )}
                </Row>
                <Dialog
                    visible={isVisible}
                    onHide={() => setIsVisible(false)}
                    content={
                        <div className="bg-white px-3 py-5 text-black">
                            <h2 className="mb-0 fw-bold text-center display-5">
                                Order completed successfully! 🎉
                            </h2>
                        </div>
                    }
                ></Dialog>
            </Container>
        </BaseLayout>
    );
};

export default CheckoutPage;
