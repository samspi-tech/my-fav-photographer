import { useContext, useEffect } from 'react';
import Posts from '../components/posts/Posts.jsx';
import BaseLayout from '../baseLayout/BaseLayout.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext.jsx';
import { PostContext } from '../contexts/PostContext.jsx';
import { saveToSessionStorage } from '../utils/sessionStorage.js';

const Homepage = () => {
    const { getMe, user } = useContext(UserContext);
    const { posts, error, isLoading, getAllPosts } = useContext(PostContext);

    useEffect(() => {
        getMe();
        getAllPosts();
    }, []);

    if (user) {
        saveToSessionStorage('role', user.role);
        saveToSessionStorage('userId', user._id);
    }

    return (
        <BaseLayout>
            <Container className="d-flex my-5">
                <Row>
                    <Col lg={3} className="d-none d-lg-block"></Col>
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
