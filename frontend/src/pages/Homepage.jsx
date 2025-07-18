import { useContext, useEffect } from 'react';
import Posts from '../components/posts/Posts.jsx';
import BaseLayout from '../baseLayout/BaseLayout.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext.jsx';
import FollowList from '../components/followList/FollowList.jsx';
import { getFromSessionStorage } from '../utils/sessionStorage.js';

const Homepage = () => {
    const { getMe } = useContext(UserContext);

    const loggedInUserId = getFromSessionStorage('userId');

    const loggedInUserRole = getFromSessionStorage('role');
    const isRoleUser = loggedInUserRole === 'user';

    useEffect(() => {
        getMe();
    }, [loggedInUserId]);

    return (
        <BaseLayout>
            <Container className="my-5">
                <Row>
                    <Col lg={3} className="d-none d-lg-block">
                        {isRoleUser && <FollowList />}
                    </Col>
                    <Col xs={12} lg={6}>
                        <Posts isHomePage={true} />
                    </Col>
                    <Col lg={3} className="d-none d-lg-block"></Col>
                </Row>
            </Container>
        </BaseLayout>
    );
};

export default Homepage;
