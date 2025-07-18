import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { ListGroup } from 'react-bootstrap';
import { FollowerContext } from '../../../contexts/FollowerContext.jsx';
import { getFromSessionStorage } from '../../../utils/sessionStorage.js';

const FollowItem = ({ followItem }) => {
    const { firstName, lastName, avatar, _id: photographerId } = followItem;

    const { unfollowPhotographer } = useContext(FollowerContext);

    const loggedInUserId = getFromSessionStorage('userId');

    const handleUnfollow = (e) => {
        e.stopPropagation();
        unfollowPhotographer(loggedInUserId, photographerId);
        window.location.reload();
    };

    return (
        <>
            <ListGroup.Item className="follow-list-item d-flex flex-column flex-xl-row align-items-center gap-2">
                <div className="d-flex align-items-center gap-2">
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
                <div className="ms-xl-auto unfollow-btn">
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
