import Posts from '../../posts/Posts.jsx';
import { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PostContext } from '../../../contexts/PostContext.jsx';
import CustomMessage from '../../customMessage/CustomMessage.jsx';

const ProfilePosts = ({ userId }) => {
    const { error, isLoading, getPhotographerPosts, photographerPosts } =
        useContext(PostContext);

    useEffect(() => {
        getPhotographerPosts(userId);
    }, [userId]);

    return (
        <Container className="mb-5">
            <Row className="justify-content-center">
                <Col lg={6}>
                    {isLoading && <CustomMessage error="Loading posts..." />}
                    {!isLoading && error && <CustomMessage error={error} />}
                    {!isLoading && !error && photographerPosts && (
                        <Posts posts={photographerPosts} />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePosts;
