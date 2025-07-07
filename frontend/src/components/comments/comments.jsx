import SingleComment from './partials/SingleComment.jsx';

const Comments = ({ post }) => {
    const { comments } = post;

    return (
        <>
            {comments.map((comment) => {
                const { _id: commentId } = comment;
                return <SingleComment key={commentId} comment={comment} />;
            })}
        </>
    );
};

export default Comments;
