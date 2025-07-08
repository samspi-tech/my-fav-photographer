import { Avatar } from 'primereact/avatar';

const SingleComment = ({ comment }) => {
    const { comment: userComment, user } = comment;

    const { firstName, lastName, avatar } = user;
    const commentAuthor = `${firstName} ${lastName}`;

    return (
        <div className="bg-body-secondary p-2">
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
            <p className="mb-0 mt-2">{userComment}</p>
        </div>
    );
};

export default SingleComment;
