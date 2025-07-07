import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Comments from '../../comments/comments.jsx';

const PostFooter = ({ post }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleIsVisible = () => {
        setIsVisible((prevState) => !prevState);
    };

    return (
        <div className="post-footer py-2 px-3">
            <Button
                link
                icon="pi pi-comment"
                onClick={handleIsVisible}
                className="shadow-none rounded-circle"
            />
            <Dialog
                header="Comments"
                visible={isVisible}
                onHide={handleIsVisible}
            >
                <Comments post={post} />
            </Dialog>
        </div>
    );
};

export default PostFooter;
