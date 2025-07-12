import { Menu } from 'primereact/menu';
import { useContext, useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { EquipmentContext } from '../../../../../contexts/EquipmentContext.jsx';
import EquipmentForm from './EquipmentForm.jsx';

const EquipmentMenu = ({ equipment }) => {
    const {
        user: userId,
        _id: equipmentId,
        camera,
        lens,
        bag,
        tripod,
        other,
    } = equipment;

    const configMenu = useRef(null);

    const { deleteEquipment, getEquipment } = useContext(EquipmentContext);

    const [isVisible, setIsVisible] = useState(false);
    const handleVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    const initialValues = {
        camera,
        lens,
        bag,
        tripod,
        other,
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
                await deleteEquipment(userId, equipmentId);
                await getEquipment(userId);
            },
        },
    ];

    return (
        <>
            <div className="equipment-menu">
                <Menu
                    model={items}
                    popup
                    ref={configMenu}
                    id="config_menu"
                    className="custom-menu"
                />
                <button
                    className="p-panel-header-icon p-link mr-2"
                    onClick={(e) => configMenu?.current?.toggle(e)}
                >
                    <span className="pi pi-ellipsis-v"></span>
                </button>
            </div>
            <Dialog
                visible={isVisible}
                onHide={handleVisibility}
                header="Edit your equipment"
            >
                <EquipmentForm
                    userId={userId}
                    submitFn="update"
                    equipmentId={equipmentId}
                    initialValues={initialValues}
                />
            </Dialog>
        </>
    );
};

export default EquipmentMenu;
