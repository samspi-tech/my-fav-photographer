import Logo from '../components/logo/Logo.jsx';
import Login from '../components/login/Login.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import LoginCover from '../components/login/partials/LoginCover.jsx';

const LoginPage = () => {
    return (
        <Container fluid={true}>
            <Row className="vh-100 flex-column justify-content-center">
                <Col lg={4} className="p-0">
                    <Row className="justify-content-center gy-5">
                        <Col xs={12}>
                            <Logo />
                        </Col>
                        <Col xs={12}>
                            <Login />
                        </Col>
                    </Row>
                </Col>
                <Col lg={8} className="p-0 d-none d-lg-block">
                    <LoginCover />
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
