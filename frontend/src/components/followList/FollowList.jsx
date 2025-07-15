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
    }, []);

    return (
        <Card title="Following" className="rounded-0">
            {isLoading && <CustomMessage error="Loading..." />}
            {!isLoading && error && <CustomMessage error={error} />}
            <ListGroup>
                {!isLoading &&
                    !error &&
                    following &&
                    following.map((follow) => {
                        const { _id: key, photographerId: followItem } = follow;
                        return <FollowItem key={key} followItem={followItem} />;
                    })}
            </ListGroup>
        </Card>
    );
};

export default FollowList;
