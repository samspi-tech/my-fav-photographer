import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { totalCheckout } from '../../../utils/shoppingCart.js';
import ErrorMessage from '../../errorMessage/ErrorMessage.jsx';
import LoadingButton from '../../loadingButton/LoadingButton.jsx';

const CheckoutBuy = ({
    address,
    isError,
    cartItems,
    setIsError,
    isEmptyCart,
    setCartItems,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();

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
                navigate('/following', { replace: true });
                localStorage.removeItem('cart');
                setCartItems([]);
            }, 4000);
        }
    };

    const purchaseSuccess = (
        <div className="purchase-success-dialog py-4">
            <h2 className="mb-0 fw-bold text-center display-5">
                Order completed successfully!
                <span className="d-block mt-3">🎉</span>
            </h2>
        </div>
    );

    return (
        <>
            <Row className="justify-content-center">
                {!isEmptyCart && (
                    <Col lg={6} className="d-flex flex-column gap-3">
                        {isError && (
                            <div className="mx-auto mb-3">
                                <ErrorMessage error="Please select an address" />
                            </div>
                        )}
                        <div className="order-total ms-auto">
                            <h3 className="mb-0">
                                <span className="pe-3">Order total:</span>€
                                {totalCheckout(cartItems)}
                            </h3>
                        </div>
                        <div className="checkout-buy-container d-flex justify-content-end align-items-center gap-3">
                            <div>
                                <h3 className="mb-0 mt-2">
                                    Paying with Visa **** 4573
                                </h3>
                            </div>
                            <div>
                                {isLoading ? (
                                    <LoadingButton />
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
                className="custom-dialog"
                content={purchaseSuccess}
            ></Dialog>
        </>
    );
};

export default CheckoutBuy;
