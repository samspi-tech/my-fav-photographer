import { useContext } from 'react';
import { Avatar } from 'primereact/avatar';
import HeaderMenu from './partials/HeaderMenu.jsx';
import { UserContext } from '../../../../contexts/UserContext.jsx';

const PostHeader = ({ post }) => {
    const { user } = post;
    const { firstName, lastName, avatar, _id: userId } = user;
    const author = `${firstName} ${lastName}`;

    const { user: loggedUser } = useContext(UserContext);

    return (
        <div className="d-flex align-items-center justify-content-between pt-2 px-3">
            <div className="post-header d-flex align-items-center gap-2">
                {<Avatar image={avatar} shape="circle" />}
                <p className="text-capitalize mb-0">{author}</p>
            </div>
            {loggedUser && loggedUser._id === userId && (
                <HeaderMenu userId={userId} post={post} />
            )}
        </div>
    );
};

export default PostHeader;
