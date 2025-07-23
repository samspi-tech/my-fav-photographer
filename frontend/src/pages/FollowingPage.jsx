import BaseLayout from '../baseLayout/BaseLayout.jsx';
import FollowList from '../components/followList/FollowList.jsx';
import { Col, Container, Row } from 'react-bootstrap';

const FollowingPage = () => {
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
