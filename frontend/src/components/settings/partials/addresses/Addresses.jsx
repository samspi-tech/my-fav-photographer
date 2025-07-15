import { Col, Row } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import AddressForm from './partials/AddressForm.jsx';
import { useContext, useEffect, useState } from 'react';
import CustomMessage from '../../../customMessage/CustomMessage.jsx';
import { AddressContext } from '../../../../contexts/AddressContext.jsx';
import { getFromSessionStorage } from '../../../../utils/sessionStorage.js';
import SingleAddress from './partials/SingleAddress.jsx';

const Addresses = () => {
    const { error, isLoading, addresses, getAddresses } =
        useContext(AddressContext);

    const loggedInUserId = getFromSessionStorage('userId');

    const [isVisible, setIsVisible] = useState(false);
    const handleVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    const initialValues = {
        street: '',
        city: '',
        province: '',
        cap: 0,
        contact: 0,
    };

    useEffect(() => {
        getAddresses(loggedInUserId);
    }, []);

    return (
        <>
            <Row className="justify-content-center mb-5">
                <Col lg={6}>
                    <Button
                        icon="pi pi-plus"
                        className="custom-btn"
                        onClick={handleVisibility}
                    />
                    <Dialog
                        visible={isVisible}
                        header="Add new address"
                        onHide={handleVisibility}
                        className="custom-dialog"
                    >
                        <AddressForm
                            submitFn="create"
                            initialValues={initialValues}
                        />
                    </Dialog>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col lg={6}>
                    {isLoading && <CustomMessage error="Loading..." />}
                    {!isLoading && error && <CustomMessage error={error} />}
                </Col>
            </Row>
            <Row className="gy-5">
                {!isLoading &&
                    !error &&
                    addresses &&
                    addresses.map((address, index) => {
                        const { _id: key } = address;

                        return (
                            <SingleAddress
                                key={key}
                                index={index}
                                address={address}
                            />
                        );
                    })}
            </Row>
        </>
    );
};

export default Addresses;
