import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/logo/Logo.jsx';
import Login from '../components/login/Login.jsx';
import Signup from '../components/signup/Signup.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';
import LoginCover from '../components/loginCover/LoginCover.jsx';

const LoginPage = () => {
    const { getMe, user } = useContext(UserContext);

    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);

    const handleIsVisible = () => {
        setIsVisible((prevState) => !prevState);
    };

    useEffect(() => {
        getMe();

        setTimeout(() => {
            if (user) navigate('success', { replace: true });
        }, 600);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, user]);

    return (
        <Container fluid={true}>
            <Signup isVisible={isVisible} handleIsVisible={handleIsVisible} />
            <Row className="vh-100 flex-column justify-content-center">
                <Col lg={4}>
                    <Row className="justify-content-center gy-5">
                        <Col xs={12}>
                            <Logo cssClass="login-logo" />
                        </Col>
                        <Col xs={12}>
                            <Login />
                        </Col>
                        <Col>
                            <div className="d-flex justify-content-center align-items-center gap-2">
                                <p className="mb-0 ">Don't have an account?</p>
                                <Button
                                    link
                                    label="Sign up"
                                    onClick={handleIsVisible}
                                    className="p-0 text-info shadow-none"
                                />
                            </div>
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
