import './comments.css';
import SingleComment from './partials/SingleComment.jsx';
import { useContext } from 'react';
import { CommentContext } from '../../contexts/CommentContext.jsx';

const Comments = ({ comments }) => {
    const { error, isLoading } = useContext(CommentContext);

    return (
        <>
            {isLoading && <p>Loading comments...</p>}
            {!isLoading && error && (
                <div className="bg-body-secondary px-2 py-3">
                    <p className="mb-0 text-secondary text-center">
                        No comments yet.
                    </p>
                </div>
            )}
            {!isLoading &&
                !error &&
                comments &&
                comments.map((comment) => {
                    const { _id: commentId } = comment;
                    return <SingleComment key={commentId} comment={comment} />;
                })}
        </>
    );
};

export default Comments;
