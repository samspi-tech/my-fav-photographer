const SingleComment = ({ comment }) => {
    const { comment: userComment, user } = comment;

    const { firstName, lastName } = user;
    const commentAuthor = `${firstName} ${lastName}`;

    return (
        <div>
            <p className="mb-0">{userComment}</p>
            <small className="text-secondary">
                by <span className="text-capitalize">{commentAuthor}</span>
            </small>
        </div>
    );
};

export default SingleComment;
