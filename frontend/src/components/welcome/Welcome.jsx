import './welcome.css';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext.jsx';
import PhotographerCard from './partials/PhotographerCard.jsx';

const Welcome = () => {
    const { getMe, user, getAllPhotographers, photographers } =
        useContext(UserContext);

    const [isDisabled, setIsDisabled] = useState(true);

    const navigate = useNavigate();

    const handleProceed = () => {
        navigate('/success');
    };

    useEffect(() => {
        getMe();
        getAllPhotographers();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col lg={6}>
                    <header className="welcome-title">
                        <h1 className="display-1 fw-bold text-center mb-0">
                            Welcome
                        </h1>
                        <h2 className="display-6 fw-bold text-center">
                            and thank you for being here!
                        </h2>
                    </header>
                    <div className="welcome-info mt-4 mx-auto shadow d-flex flex-column align-items-center gap-2">
                        <span className="pi pi-info-circle"></span>
                        <p className="text-center mb-0">
                            Before proceeding follow at least one of this
                            photographers, please.
                        </p>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-centers gy-3 my-4 flex-lg-column align-items-lg-center">
                {photographers &&
                    photographers.slice(0, 4).map((photographer) => {
                        const { _id: key } = photographer;

                        return (
                            <PhotographerCard
                                key={key}
                                user={user}
                                photographer={photographer}
                                setIsDisabled={setIsDisabled}
                            />
                        );
                    })}
                <Col xs={12} md={6} lg={4}>
                    <Button
                        label="Proceed"
                        disabled={isDisabled}
                        className="custom-btn"
                        onClick={handleProceed}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Welcome;
