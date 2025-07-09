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
                icon="pi pi-file-plus"
                onClick={handleIsVisible}
                tooltipOptions={{ position: 'bottom' }}
                className="text-white shadow-none me-3"
            />
            <Dialog
                position="top"
                visible={isVisible}
                focusOnShow={false}
                header="Create new post"
                onHide={handleIsVisible}
            >
                <PostForm initialValues={initialValues} submitFn="create" />
            </Dialog>
        </>
    );
};

export default CreatePost;
