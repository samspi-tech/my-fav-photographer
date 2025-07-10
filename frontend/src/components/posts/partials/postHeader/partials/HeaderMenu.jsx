import { Menu } from 'primereact/menu';
import { useContext, useRef, useState } from 'react';
import { PostContext } from '../../../../../contexts/PostContext.jsx';
import PostForm from '../../../../postForm/PostForm.jsx';
import { Dialog } from 'primereact/dialog';

const HeaderMenu = ({ userId, post }) => {
    const { title, body, _id: postId } = post;
    const { deletePost } = useContext(PostContext);

    const [isVisible, setIsVisible] = useState(false);

    const handleIsVisible = () => {
        setIsVisible((prevState) => !prevState);
    };

    const initialValues = {
        title: `${title}`,
        body: `${body}`,
    };

    const configMenu = useRef(null);
    const items = [
        {
            label: 'Edit',
            icon: 'pi pi-file-edit',
            command: handleIsVisible,
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
                <span className="pi pi-ellipsis-v"></span>
            </button>
            <Dialog
                position="top"
                visible={isVisible}
                focusOnShow={false}
                header="Update your post"
                onHide={handleIsVisible}
            >
                <PostForm
                    postId={postId}
                    submitFn="update"
                    initialValues={initialValues}
                />
            </Dialog>
        </div>
    );
};

export default HeaderMenu;
