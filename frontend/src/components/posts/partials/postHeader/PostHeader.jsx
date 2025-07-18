import { Avatar } from 'primereact/avatar';
import HeaderMenu from './partials/HeaderMenu.jsx';
import { getFromSessionStorage } from '../../../../utils/sessionStorage.js';
import { Link } from 'react-router-dom';

const PostHeader = ({ post }) => {
    const { user } = post;
    const { firstName, lastName, avatar, _id: postAuthorId } = user;

    const loggedInUserId = getFromSessionStorage('userId');

    return (
        <div className="d-flex align-items-center justify-content-between py-2 px-3">
            <div className="post-header d-flex align-items-center gap-2">
                {<Avatar image={avatar} shape="circle" className="" />}
                <Link
                    className="follow-list-link"
                    to={`/photographer/${postAuthorId}`}
                >
                    <p className="text-capitalize mb-0">
                        {firstName} {lastName}
                    </p>
                </Link>
            </div>
            {loggedInUserId === postAuthorId && (
                <HeaderMenu userId={postAuthorId} post={post} />
            )}
        </div>
    );
};

export default PostHeader;
