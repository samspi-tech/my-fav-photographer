import { Avatar } from 'primereact/avatar';
import { ListGroup } from 'react-bootstrap';
import { useContext } from 'react';
import { FollowerContext } from '../../../contexts/FollowerContext.jsx';
import { getFromSessionStorage } from '../../../utils/sessionStorage.js';
import { Button } from 'primereact/button';

const FollowItem = ({ followItem }) => {
    const { firstName, lastName, avatar, _id: photographerId } = followItem;

    const { unfollowPhotographer, getFollowing } = useContext(FollowerContext);
    const loggedInUserId = getFromSessionStorage('userId');

    return (
        <>
            <ListGroup.Item className="d-flex align-items-center gap-2">
                <Avatar shape="circle" image={avatar} />
                <span className="text-capitalize fw-medium">
                    {firstName} {lastName}
                </span>
                <div className="ms-auto">
                    <Button
                        label="Unfollow"
                        className="custom-btn small p-1"
                        onClick={async () => {
                            await unfollowPhotographer(
                                loggedInUserId,
                                photographerId,
                            );
                            await getFollowing(loggedInUserId);
                        }}
                    />
                </div>
            </ListGroup.Item>
        </>
    );
};

export default FollowItem;
