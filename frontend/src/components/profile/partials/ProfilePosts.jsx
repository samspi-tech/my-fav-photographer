import Posts from '../../posts/Posts.jsx';
import { Col, Container, Row } from 'react-bootstrap';

const ProfilePosts = () => {
    return (
        <Container className="mb-5">
            <Row className="justify-content-center">
                <Col lg={6}>
                    <Posts isHomePage={false} />
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePosts;
