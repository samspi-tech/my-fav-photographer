import { Card } from 'primereact/card';
import { ListGroup } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import FollowItem from './partials/FollowItem.jsx';
import CustomMessage from '../customMessage/CustomMessage.jsx';
import { FollowerContext } from '../../contexts/FollowerContext.jsx';
import { getFromSessionStorage } from '../../utils/sessionStorage.js';

const FollowList = () => {
    const loggedInUserId = getFromSessionStorage('userId');

    const loggedInUserRole = getFromSessionStorage('role');
    const isRoleUser = loggedInUserRole === 'user';

    const { error, isLoading, getFollowers, getFollowing, followList } =
        useContext(FollowerContext);

    useEffect(() => {
        isRoleUser
            ? getFollowing(loggedInUserId)
            : getFollowers(loggedInUserId);
    }, []);

    return (
        <Card className="rounded-0">
            <h5 className="fw-bold">
                {isRoleUser ? 'Following' : 'Followers'}
            </h5>
            {isLoading && <CustomMessage error="Loading..." />}
            {!isLoading && error && <CustomMessage error={error} />}
            <ListGroup>
                {!isLoading &&
                    !error &&
                    followList &&
                    followList.map((follow) => {
                        if (isRoleUser) {
                            const { _id: key, photographerId: followItem } =
                                follow;
                            return (
                                <FollowItem key={key} followItem={followItem} />
                            );
                        } else {
                            const { _id: key, followerId: followItem } = follow;
                            return (
                                <FollowItem key={key} followItem={followItem} />
                            );
                        }
                    })}
            </ListGroup>
        </Card>
    );
};

export default FollowList;
