import './comments.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useContext, useState } from 'react';
import CommentForm from './partials/CommentForm.jsx';
import SingleComment from './partials/SingleComment.jsx';
import { PostContext } from '../../contexts/PostContext.jsx';
import CustomMessage from '../customMessage/CustomMessage.jsx';
import { CommentContext } from '../../contexts/CommentContext.jsx';
import { getFromSessionStorage } from '../../utils/sessionStorage.js';

const Comments = ({ post }) => {
    const { getAllPosts } = useContext(PostContext);
    const { error, isLoading, comments, getPostComments } =
        useContext(CommentContext);

    const { getPhotographerPosts } = useContext(PostContext);

    const loggedInUserId = getFromSessionStorage('userId');

    const loggedInUserRole = getFromSessionStorage('role');
    const isRoleUser = loggedInUserRole === 'user';

    const { _id: postId, comments: postComments, user } = post;
    const commentsNum = postComments.length;

    const { _id: userId } = user;

    const [isVisible, setIsVisible] = useState(false);

    const handleIsVisible = () => {
        setIsVisible((prevState) => !prevState);
    };

    const initialValues = { comment: '' };

    return (
        <>
            <div className="comment-btn-container d-flex flex-column justify-content-center align-items-center">
                <Button
                    link
                    icon="pi pi-comments"
                    onClick={async () => {
                        handleIsVisible();
                        await getPostComments(postId);
                    }}
                    className="shadow-none rounded-circle"
                />
                <small>
                    {commentsNum} {commentsNum === 1 ? 'Comment' : 'Comments'}
                </small>
            </div>
            <Dialog
                header="Comments"
                className="custom-dialog"
                visible={isVisible}
                onHide={async () => {
                    handleIsVisible();
                    isRoleUser && (await getAllPosts(loggedInUserId));
                    await getPhotographerPosts(userId);
                }}
            >
                <div className="comments-container d-flex flex-column gap-2">
                    {isLoading && (
                        <CustomMessage loading={true} error="Loading..." />
                    )}
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
                <CommentForm
                    postId={postId}
                    submitFn="create"
                    initialValues={initialValues}
                />
            </Dialog>
        </>
    );
};

export default Comments;
