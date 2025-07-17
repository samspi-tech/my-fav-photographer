import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import AddressForm from './AddressForm.jsx';
import { useContext, useRef, useState } from 'react';
import { AddressContext } from '../../../../../contexts/AddressContext.jsx';

const AddressMenu = ({ title, userId, address, showMenu }) => {
    const { deleteAddress, getAddresses } = useContext(AddressContext);

    const { street, city, province, cap, contact, _id: addressId } = address;

    const configMenu = useRef(null);

    const [isVisible, setIsVisible] = useState(false);
    const handleVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    const initialValues = {
        street,
        city,
        province,
        cap,
        contact,
    };

    const items = [
        {
            label: 'Edit',
            icon: 'pi pi-file-edit',
            command: handleVisibility,
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: async () => {
                await deleteAddress(userId, addressId);
                await getAddresses(userId);
            },
        },
    ];

    return (
        <>
            <div className="d-flex align-items-center justify-content-between p-3">
                <h5 className="text-black fw-medium">{title}</h5>
                <Menu
                    model={items}
                    popup
                    ref={configMenu}
                    id="config_menu"
                    className="custom-menu"
                />
                {showMenu && (
                    <button
                        className="p-panel-header-icon p-link mr-2"
                        onClick={(e) => configMenu?.current?.toggle(e)}
                    >
                        <span className="pi pi-ellipsis-v"></span>
                    </button>
                )}
            </div>
            <Dialog
                visible={isVisible}
                header="Edit address"
                onHide={handleVisibility}
                className="custom-dialog"
            >
                <AddressForm
                    submitFn="update"
                    addressId={addressId}
                    initialValues={initialValues}
                />
            </Dialog>
        </>
    );
};

export default AddressMenu;
