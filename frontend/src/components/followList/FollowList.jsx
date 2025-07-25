import './followList.css';
import { Card } from 'primereact/card';
import { ListGroup } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import FollowItem from './partials/FollowItem.jsx';
import CustomMessage from '../customMessage/CustomMessage.jsx';
import { FollowerContext } from '../../contexts/FollowerContext.jsx';
import { getFromSessionStorage } from '../../utils/sessionStorage.js';

const FollowList = () => {
    const loggedInUserId = getFromSessionStorage('userId');

    const { error, isLoading, getFollowing, following } =
        useContext(FollowerContext);

    useEffect(() => {
        getFollowing(loggedInUserId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const followingListTitle = (
        <span className="following-list-title fs-2">Following</span>
    );

    return (
        <Card
            title={followingListTitle}
            className="card following-card custom-card"
        >
            {isLoading && <CustomMessage error="Loading..." />}
            {!isLoading && error && <CustomMessage error={error} />}
            <ListGroup>
                {!isLoading &&
                    !error &&
                    following &&
                    following.following.map((follow) => {
                        const { _id: key, photographerId: followItem } = follow;
                        return <FollowItem key={key} followItem={followItem} />;
                    })}
            </ListGroup>
        </Card>
    );
};

export default FollowList;
