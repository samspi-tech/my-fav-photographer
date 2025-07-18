import { Col, Row } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { UserContext } from '../../../contexts/UserContext.jsx';
import CustomMessage from '../../customMessage/CustomMessage.jsx';
import { AddressContext } from '../../../contexts/AddressContext.jsx';
import { getFromSessionStorage } from '../../../utils/sessionStorage.js';
import SingleAddress from '../../settings/partials/addresses/partials/SingleAddress.jsx';

const CheckoutAddress = ({ address, setAddress, setIsError }) => {
    const { user } = useContext(UserContext);

    const { getAddresses, addresses } = useContext(AddressContext);
    const addressList = addresses && addresses.map((address) => address);

    const loggedInUserId = getFromSessionStorage('userId');

    useEffect(() => {
        getAddresses(loggedInUserId);

        if (address) setIsError(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    return (
        <Row className="flex-column align-items-center gy-1">
            <Col lg={6}>
                <h3>Choose address</h3>
                <Dropdown
                    value={address}
                    optionLabel="street"
                    options={addressList}
                    placeholder="Select an address"
                    className="w-100 custom-input checkout-input"
                    onChange={(e) => setAddress(e.value)}
                />
            </Col>
            <Col lg={6}>
                {!address && <CustomMessage error="No address selected" />}
            </Col>
            {address && addresses && (
                <SingleAddress
                    address={address}
                    showMenu={false}
                    addressTitle={`Delivering to ${user.firstName} ${user.lastName}`}
                />
            )}
        </Row>
    );
};

export default CheckoutAddress;
