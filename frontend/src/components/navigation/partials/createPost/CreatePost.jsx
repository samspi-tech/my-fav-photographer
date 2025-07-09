import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import PostForm from './partials/PostForm.jsx';

const CreatePost = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleIsVisible = () => {
        setIsVisible((prevState) => !prevState);
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
                <PostForm />
            </Dialog>
        </>
    );
};

export default CreatePost;
