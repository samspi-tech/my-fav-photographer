import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { useContext, useRef, useState } from 'react';
import { WorkshopContext } from '../../../../../contexts/WorkshopContext.jsx';
import WorkshopForm from './WorkshopForm.jsx';

const WorkshopMenu = ({ workshop }) => {
    const configMenu = useRef(null);

    const { _id: workshopId, user: userId, title, body, date } = workshop;

    const { deleteWorkshop, getWorkshops } = useContext(WorkshopContext);

    const [isVisible, setIsVisible] = useState(false);
    const handleVisibility = () => {
        setIsVisible((prevState) => !prevState);
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
                await deleteWorkshop(userId, workshopId);
                await getWorkshops(userId);
            },
        },
    ];

    const initialValues = {
        title,
        body,
        date,
    };

    return (
        <div>
            <Menu
                popup
                model={items}
                ref={configMenu}
                id="config_menu"
                className="custom-menu"
            />
            <button
                className="post-menu p-panel-header-icon p-link"
                onClick={(e) => configMenu?.current?.toggle(e)}
            >
                <span className="pi pi-ellipsis-v"></span>
            </button>
            <Dialog
                visible={isVisible}
                onHide={handleVisibility}
                className="custom-dialog"
                header="Update your workshop"
            >
                <WorkshopForm
                    userId={userId}
                    submitFn="update"
                    workshopId={workshopId}
                    initialValues={initialValues}
                />
            </Dialog>
        </div>
    );
};

export default WorkshopMenu;
