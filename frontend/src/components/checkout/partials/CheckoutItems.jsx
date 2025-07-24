import { Col, ListGroup, Row } from 'react-bootstrap';
import CustomMessage from '../../customMessage/CustomMessage.jsx';
import CartSingleItem from '../../shoppingCart/partials/CartSingleItem.jsx';

const CheckoutItems = ({ isEmptyCart, cartItems }) => {
    return (
        <Row className="justify-content-center">
            <Col lg={6}>
                <ListGroup>
                    <h3>Your order</h3>
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
                {isEmptyCart && <CustomMessage error="Your cart is empty" />}
            </Col>
        </Row>
    );
};

export default CheckoutItems;
