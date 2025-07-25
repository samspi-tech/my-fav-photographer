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
                <Col lg={8}>
                    <Button
                        icon="pi pi-plus"
                        className="custom-btn"
                        label="Add a new address"
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
                            handleVisibility={handleVisibility}
                        />
                    </Dialog>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col lg={8} className="mb-5">
                    {isLoading && (
                        <div className="mb-5">
                            <CustomMessage
                                loading={true}
                                error="Loading addresses..."
                            />
                        </div>
                    )}
                    {!isLoading && error && <CustomMessage error={error} />}
                    <Row className="justify-content-center gy-3">
                        {!isLoading &&
                            !error &&
                            addresses &&
                            addresses.map((address, index) => {
                                const { _id: key } = address;

                                return (
                                    <SingleAddress
                                        key={key}
                                        index={index}
                                        showMenu={true}
                                        address={address}
                                        addressTitle={`Address ${index + 1}`}
                                    />
                                );
                            })}
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default Addresses;
