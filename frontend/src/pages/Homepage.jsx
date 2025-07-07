import { useContext, useEffect } from 'react';
import Posts from '../components/posts/Posts.jsx';
import BaseLayout from '../baseLayout/BaseLayout.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import { useFetchData } from '../hooks/useFetchData.js';
import { UserContext } from '../contexts/UserContext.jsx';

const Homepage = () => {
    const { getMe } = useContext(UserContext);
    const { fetchData, data, error, isLoading } = useFetchData();

    useEffect(() => {
        getMe();
        fetchData('post');
    }, []);

    return (
        <BaseLayout>
            <Container className="d-flex my-5">
                <Row>
                    <Col lg={3} className="d-none d-lg-block"></Col>
                    <Col xs={12} lg={6}>
                        {isLoading && <p>Loading...</p>}
                        {!isLoading && error && <p>{error}</p>}
                        {!isLoading && !error && data && (
                            <Posts
                                error={error}
                                posts={data.posts}
                                loading={isLoading}
                            />
                        )}
                    </Col>
                    <Col lg={3} className="d-none d-lg-block"></Col>
                </Row>
            </Container>
        </BaseLayout>
    );
};

export default Homepage;
