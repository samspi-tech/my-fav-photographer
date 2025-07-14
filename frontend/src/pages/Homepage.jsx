import {
    getFromSessionStorage,
    saveToSessionStorage,
} from '../utils/sessionStorage.js';
import { useContext, useEffect } from 'react';
import Posts from '../components/posts/Posts.jsx';
import BaseLayout from '../baseLayout/BaseLayout.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext.jsx';
import { PostContext } from '../contexts/PostContext.jsx';
import FollowList from '../components/followList/FollowList.jsx';
import { FollowerContext } from '../contexts/FollowerContext.jsx';

const Homepage = () => {
    const { getMe, user } = useContext(UserContext);
    const { posts, error, isLoading, getAllPosts } = useContext(PostContext);
    const { getFollowing } = useContext(FollowerContext);

    const loggedInUserId = getFromSessionStorage('userId');

    const loggedInUserRole = getFromSessionStorage('role');
    const isRoleUser = loggedInUserRole === 'user';

    useEffect(() => {
        getMe();
        getAllPosts();
        getFollowing(loggedInUserId);
    }, [loggedInUserId]);

    if (user) {
        saveToSessionStorage('role', user.role);
        saveToSessionStorage('userId', user._id);
    }

    return (
        <BaseLayout>
            <Container className="d-flex my-5">
                <Row>
                    <Col lg={3} className="d-none d-lg-block">
                        {isRoleUser && <FollowList />}
                    </Col>
                    <Col xs={12} lg={6}>
                        {isLoading && <p>Loading...</p>}
                        {!isLoading && error && <p>{error}</p>}
                        {!isLoading && !error && posts && (
                            <Posts posts={posts} />
                        )}
                    </Col>
                    <Col lg={3} className="d-none d-lg-block"></Col>
                </Row>
            </Container>
        </BaseLayout>
    );
};

export default Homepage;
