import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import PostForm from '../../../postForm/PostForm.jsx';

const CreatePost = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleIsVisible = () => {
        setIsVisible((prevState) => !prevState);
    };

    const initialValues = {
        title: '',
        body: '',
    };

    return (
        <>
            <Button
                text
                tooltip="New post"
                icon="pi pi-pen-to-square"
                onClick={handleIsVisible}
                tooltipOptions={{ position: 'bottom' }}
                className="nav-end-icon shadow-none bg-transparent me-3"
            />
            <Dialog
                visible={isVisible}
                focusOnShow={false}
                header="Create new post"
                onHide={handleIsVisible}
                className="custom-dialog"
            >
                <PostForm initialValues={initialValues} submitFn="create" />
            </Dialog>
        </>
    );
};

export default CreatePost;
