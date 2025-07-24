import Posts from '../../../posts/Posts.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import CreatePost from './partials/CreatePost.jsx';
import { getFromSessionStorage } from '../../../../utils/sessionStorage.js';

const ProfilePosts = () => {
    const loggedInUserRol = getFromSessionStorage('role');
    const isRoleUser = loggedInUserRol === 'photographer';

    return (
        <Container className="mb-5">
            {isRoleUser && (
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <CreatePost />
                    </Col>
                </Row>
            )}
            <Row className="justify-content-center">
                <Col lg={6}>
                    <Posts />
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePosts;
