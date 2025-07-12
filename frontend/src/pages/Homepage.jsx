import { useContext, useEffect } from 'react';
import Posts from '../components/posts/Posts.jsx';
import BaseLayout from '../baseLayout/BaseLayout.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext.jsx';
import { PostContext } from '../contexts/PostContext.jsx';

const Homepage = () => {
    const { getMe } = useContext(UserContext);
    const { data, error, isLoading, getAllPosts } = useContext(PostContext);

    useEffect(() => {
        getMe();
        getAllPosts();
    }, []);

    return (
        <BaseLayout>
            <Container className="d-flex my-5">
                <Row>
                    <Col lg={3} className="d-none d-lg-block"></Col>
                    <Col xs={12} lg={6}>
                        {isLoading && <p>Loading...</p>}
                        {!isLoading && error && <p>{error}</p>}
                        {!isLoading && !error && data && <Posts posts={data} />}
                    </Col>
                    <Col lg={3} className="d-none d-lg-block"></Col>
                </Row>
            </Container>
        </BaseLayout>
    );
};

export default Homepage;
