import { Col } from 'react-bootstrap';
import { Panel } from 'primereact/panel';
import AddressMenu from './AddressMenu.jsx';

const SingleAddress = ({ address, addressTitle, showMenu }) => {
    const { street, province, city, cap, contact, user: userId } = address;

    return (
        <Col lg={4} className="mx-auto">
            <Panel
                headerTemplate={
                    <AddressMenu
                        userId={userId}
                        address={address}
                        title={addressTitle}
                        showMenu={showMenu}
                    />
                }
            >
                <div className="fw-medium">
                    <p className="mb-0">{street}</p>
                    <p className="mb-0">
                        <span>{cap}</span> <span>{city}</span>{' '}
                        <span>{province}</span>
                    </p>
                    <p className="mb-0">{contact}</p>
                </div>
            </Panel>
        </Col>
    );
};

export default SingleAddress;
