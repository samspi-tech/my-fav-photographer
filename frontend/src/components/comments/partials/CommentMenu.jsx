import { Menu } from 'primereact/menu';
import { useContext, useRef } from 'react';
import { UserContext } from '../../../contexts/UserContext.jsx';
import { CommentContext } from '../../../contexts/CommentContext.jsx';

const CommentMenu = ({ postId, commentId, handleUpdate }) => {
    const { user } = useContext(UserContext);
    const configMenu = useRef(null);

    const { deleteComment } = useContext(CommentContext);

    const items = [
        {
            label: 'Edit',
            icon: 'pi pi-file-edit',
            command: handleUpdate,
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => deleteComment(user._id, postId, commentId),
        },
    ];

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
                className="p-panel-header-icon p-link mr-2 text-secondary"
                onClick={(e) => configMenu?.current?.toggle(e)}
            >
                <span className="pi pi-ellipsis-v"></span>
            </button>
        </div>
    );
};

export default CommentMenu;
