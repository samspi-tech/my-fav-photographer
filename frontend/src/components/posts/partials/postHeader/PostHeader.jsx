import { Avatar } from 'primereact/avatar';
import HeaderMenu from './partials/HeaderMenu.jsx';
import { getFromSessionStorage } from '../../../../utils/sessionStorage.js';

const PostHeader = ({ post }) => {
    const { user } = post;
    const { firstName, lastName, avatar, _id: postAuthorId } = user;

    const loggedInUserId = getFromSessionStorage('userId');

    return (
        <div className="d-flex align-items-center justify-content-between py-2 px-3">
            <div className="post-header d-flex align-items-center gap-3">
                {<Avatar image={avatar} shape="circle" className="" />}
                <p className="text-capitalize mb-0">
                    {firstName} {lastName}
                </p>
            </div>
            {loggedInUserId === postAuthorId && (
                <HeaderMenu userId={postAuthorId} post={post} />
            )}
        </div>
    );
};

export default PostHeader;
