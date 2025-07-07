import { Avatar } from 'primereact/avatar';

const PostHeader = ({ post }) => {
    const { user } = post;
    const { firstName, lastName, avatar } = user;
    const author = `${firstName} ${lastName}`;

    return (
        <div className="post-header d-flex align-items-center gap-2 pt-2 px-3">
            {<Avatar image={avatar} shape="circle" />}
            <p className="text-capitalize mb-0">{author}</p>
        </div>
    );
};

export default PostHeader;
