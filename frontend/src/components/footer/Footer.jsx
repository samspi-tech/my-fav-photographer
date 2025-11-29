import { Col, Row } from 'react-bootstrap';

const Footer = () => {
    const currYear = new Date().getFullYear();

    return (
        <footer className="container py-2 mt-auto">
            <Row>
                <Col className="d-flex justify-content-center">
                    <small>
                        &copy; Copyright {currYear} &ndash; MyFavPhotographer
                    </small>
                </Col>
            </Row>
        </footer>
    );
};

export default Footer;
