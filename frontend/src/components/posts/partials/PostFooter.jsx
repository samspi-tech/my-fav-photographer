import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Comments from '../../comments/comments.jsx';

const PostFooter = ({ post }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleIsVisible = () => {
        setIsVisible((prevState) => !prevState);
    };

    const { comments } = post;
    const commentsNum = comments.length;

    return (
        <div className="post-footer d-flex py-2 px-3">
            <div className="d-flex flex-column justify-content-center align-items-center">
                <Button
                    link
                    icon="pi pi-comments"
                    onClick={handleIsVisible}
                    className="shadow-none rounded-circle text-secondary"
                />
                <small className="text-secondary">{commentsNum} Comments</small>
            </div>
            <Dialog
                header="Comments"
                visible={isVisible}
                onHide={handleIsVisible}
            >
                <div className="d-flex flex-column gap-2">
                    <Comments post={post} />
                </div>
            </Dialog>
        </div>
    );
};

export default PostFooter;
