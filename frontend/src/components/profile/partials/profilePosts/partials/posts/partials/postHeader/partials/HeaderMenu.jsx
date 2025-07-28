import { Menu } from 'primereact/menu';
import { useContext, useRef, useState } from 'react';
import { PostContext } from '../../../../../../../../../contexts/PostContext.jsx';
import PostForm from '../../../../PostForm.jsx';
import { Dialog } from 'primereact/dialog';

const HeaderMenu = ({ userId, post }) => {
    const { title, body, _id: postId, user } = post;
    const { _id: postAuthorId } = user;
    const { deletePost, getPhotographerPosts } = useContext(PostContext);

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
            command: async () => {
                await deletePost(userId, postId);
                await getPhotographerPosts(postAuthorId);
            },
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
                className="post-menu p-panel-header-icon p-link"
                onClick={(e) => configMenu?.current?.toggle(e)}
            >
                <span className="pi pi-ellipsis-v"></span>
            </button>
            <Dialog
                visible={isVisible}
                focusOnShow={false}
                header="Update your post"
                onHide={handleIsVisible}
                className="custom-dialog"
            >
                <PostForm
                    postId={postId}
                    submitFn="update"
                    initialValues={initialValues}
                    handleVisibility={handleIsVisible}
                />
            </Dialog>
        </div>
    );
};

export default HeaderMenu;
