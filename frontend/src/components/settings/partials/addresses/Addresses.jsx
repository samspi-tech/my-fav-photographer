import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import AddressForm from './partials/AddressForm.jsx';

const Addresses = () => {
    const [isVisible, setIsVisible] = useState(false);
    const handleVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    const initialValues = {
        street: '',
        city: '',
        province: '',
        cap: '',
        contact: '',
    };

    return (
        <Row className="flex-column align-items-center gy-5">
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
                    <AddressForm initialValues={initialValues} />
                </Dialog>
            </Col>
            <Col lg={6}> address</Col>
        </Row>
    );
};

export default Addresses;
