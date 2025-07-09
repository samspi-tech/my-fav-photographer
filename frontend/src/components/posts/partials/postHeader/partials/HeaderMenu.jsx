import { Menu } from 'primereact/menu';
import { useContext, useRef } from 'react';
import { PostContext } from '../../../../../contexts/PostContext.jsx';

const HeaderMenu = ({ userId, postId }) => {
    const { deletePost } = useContext(PostContext);

    const configMenu = useRef(null);
    const items = [
        {
            label: 'Edit',
            icon: 'pi pi-file-edit',
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => deletePost(userId, postId),
        },
    ];

    return (
        <div>
            <Menu
                popup
                model={items}
                ref={configMenu}
                id="config_menu"
                className="post-menu"
            />
            <button
                className="p-panel-header-icon p-link mr-2"
                onClick={(e) => configMenu?.current?.toggle(e)}
            >
                <span className="pi pi-cog"></span>
            </button>
        </div>
    );
};

export default HeaderMenu;
