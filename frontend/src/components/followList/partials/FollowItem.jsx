import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { ListGroup } from 'react-bootstrap';
import { FollowerContext } from '../../../contexts/FollowerContext.jsx';
import { getFromSessionStorage } from '../../../utils/sessionStorage.js';

const FollowItem = ({ followItem }) => {
    const { firstName, lastName, avatar, _id: photographerId } = followItem;

    const { unfollowPhotographer, getFollowing } = useContext(FollowerContext);

    const loggedInUserId = getFromSessionStorage('userId');

    const handleUnfollow = async () => {
        await unfollowPhotographer(loggedInUserId, photographerId);
        await getFollowing(loggedInUserId);
    };

    return (
        <>
            <ListGroup.Item className="follow-list-item d-flex align-items-center py-3">
                <div className="d-flex align-items-center gap-3">
                    <Avatar shape="circle" image={avatar} />
                    <Link
                        className="follow-list-link"
                        to={`/photographer/${photographerId}`}
                    >
                        <span className="text-capitalize fw-medium">
                            {firstName} {lastName}
                        </span>
                    </Link>
                </div>
                <div className="ms-auto">
                    <Button
                        label="Unfollow"
                        onClick={handleUnfollow}
                        className="custom-btn small p-1 w-100"
                    />
                </div>
            </ListGroup.Item>
        </>
    );
};

export default FollowItem;
