import { useContext } from 'react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { ListGroup } from 'react-bootstrap';
import { FollowerContext } from '../../../contexts/FollowerContext.jsx';
import { getFromSessionStorage } from '../../../utils/sessionStorage.js';

const FollowItem = ({ followItem }) => {
    const { firstName, lastName, avatar, _id: photographerId } = followItem;

    const { unfollowPhotographer } = useContext(FollowerContext);

    const loggedInUserId = getFromSessionStorage('userId');

    return (
        <>
            <ListGroup.Item className="d-flex flex-column flex-xl-row align-items-center gap-2">
                <div className="d-flex align-items-center gap-1">
                    <Avatar shape="circle" image={avatar} />
                    <span className="text-capitalize fw-medium">
                        {firstName} {lastName}
                    </span>
                </div>
                <div className="ms-xl-auto unfollow-btn">
                    <Button
                        label="Unfollow"
                        className="custom-btn small p-1 w-100"
                        onClick={async () => {
                            await unfollowPhotographer(
                                loggedInUserId,
                                photographerId,
                            );
                            window.location.reload();
                        }}
                    />
                </div>
            </ListGroup.Item>
        </>
    );
};

export default FollowItem;
