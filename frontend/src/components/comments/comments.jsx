import './comments.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useContext, useState } from 'react';
import SingleComment from './partials/SingleComment.jsx';
import { CommentContext } from '../../contexts/CommentContext.jsx';
import CustomMessage from '../customMessage/CustomMessage.jsx';

const Comments = ({ post }) => {
    const { error, isLoading } = useContext(CommentContext);

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
                    {isLoading && <CustomMessage error="Loading..." />}
                    {!isLoading && error && (
                        <CustomMessage error="No comments yet." />
                    )}
                    {!isLoading &&
                        !error &&
                        comments &&
                        comments.map((comment) => {
                            const { _id: commentId } = comment;
                            return (
                                <SingleComment
                                    key={commentId}
                                    comment={comment}
                                />
                            );
                        })}
                </div>
            </Dialog>
        </>
    );
};

export default Comments;
