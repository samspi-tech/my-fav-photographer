import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import PostForm from '../../../../postForm/PostForm.jsx';

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
                icon="pi pi-plus"
                label="Create a new post"
                onClick={handleIsVisible}
                className="custom-btn mb-5"
            />
            <Dialog
                visible={isVisible}
                focusOnShow={false}
                header="Create new post"
                onHide={handleIsVisible}
                className="custom-dialog"
            >
                <PostForm
                    submitFn="create"
                    initialValues={initialValues}
                    handleVisibility={handleIsVisible}
                />
            </Dialog>
        </>
    );
};

export default CreatePost;
