import { Avatar } from 'primereact/avatar';
import CommentMenu from './CommentMenu.jsx';
import { useContext, useState } from 'react';
import CommentForm from './CommentForm.jsx';
import { UserContext } from '../../../contexts/UserContext.jsx';

const SingleComment = ({ comment }) => {
    const { user: loggedInUser } = useContext(UserContext);
    const [isCommentUpdate, setIsCommentUpdate] = useState(false);

    const handleIsCommentUpdate = () => {
        setIsCommentUpdate((prevState) => !prevState);
    };

    const {
        user,
        post: postId,
        _id: commentId,
        comment: userComment,
    } = comment;

    const { firstName, lastName, avatar } = user;
    const commentAuthor = `${firstName} ${lastName}`;

    const initialValue = {
        comment: userComment,
    };

    return (
        <div className="bg-body-secondary p-2">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                    <Avatar
                        image={avatar}
                        shape="circle"
                        className="comment-avatar"
                    />
                    <small className="text-secondary fw-medium">
                        <span className="text-capitalize">{commentAuthor}</span>
                    </small>
                </div>
                {loggedInUser && loggedInUser._id === user._id && (
                    <CommentMenu
                        postId={postId}
                        commentId={commentId}
                        handleUpdate={handleIsCommentUpdate}
                    />
                )}
            </div>
            {isCommentUpdate ? (
                <CommentForm
                    postId={postId}
                    submitFn="update"
                    commentId={commentId}
                    initialValues={initialValue}
                />
            ) : (
                <p className="mb-0 mt-2">{userComment}</p>
            )}
        </div>
    );
};

export default SingleComment;
