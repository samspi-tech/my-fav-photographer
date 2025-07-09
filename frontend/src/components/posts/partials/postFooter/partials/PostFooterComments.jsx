import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useContext, useState } from 'react';
import Comments from '../../../../comments/comments.jsx';
import { CommentContext } from '../../../../../contexts/CommentContext.jsx';

const PostFooterComments = ({ post }) => {
    const { _id: postId, comments: postComments } = post;
    const commentsNum = postComments.length;

    const { getPostComments, comments } = useContext(CommentContext);

    const [isVisible, setIsVisible] = useState(false);

    const handleIsVisible = () => {
        setIsVisible((prevState) => !prevState);
    };

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <Button
                    link
                    icon="pi pi-comments"
                    onClick={() => {
                        handleIsVisible();
                        getPostComments(postId);
                        console.log(postId);
                    }}
                    className="shadow-none rounded-circle text-secondary"
                />
                <small className="text-secondary">
                    {commentsNum} {commentsNum === 1 ? 'Comment' : 'Comments'}
                </small>
            </div>
            <Dialog
                header="Comments"
                visible={isVisible}
                onHide={handleIsVisible}
            >
                <div className="d-flex flex-column gap-2">
                    <Comments comments={comments} />
                </div>
            </Dialog>
        </>
    );
};

export default PostFooterComments;
