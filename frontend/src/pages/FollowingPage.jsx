import { useContext, useEffect } from 'react';
import BaseLayout from '../baseLayout/BaseLayout.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext.jsx';
import FollowList from '../components/followList/FollowList.jsx';
import { getFromSessionStorage } from '../utils/sessionStorage.js';

const FollowingPage = () => {
    const { getMe } = useContext(UserContext);
    const loggedInUserId = getFromSessionStorage('userId');

    useEffect(() => {
        getMe();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUserId]);

    return (
        <BaseLayout>
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={4}>
                        <FollowList />
                    </Col>
                </Row>
            </Container>
        </BaseLayout>
    );
};

export default FollowingPage;
