import './comments.css';
import SingleComment from './partials/SingleComment.jsx';

const Comments = ({ post }) => {
    const { comments } = post;

    return (
        <>
            {comments.length === 0 && (
                <div className="bg-body-secondary px-2 py-3">
                    <p className="mb-0 text-secondary text-center">
                        No comments yet.
                    </p>
                </div>
            )}
            {comments.map((comment) => {
                const { _id: commentId } = comment;
                return <SingleComment key={commentId} comment={comment} />;
            })}
        </>
    );
};

export default Comments;
