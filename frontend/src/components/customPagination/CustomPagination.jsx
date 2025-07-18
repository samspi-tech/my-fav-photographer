import './customPagination.css';
import { Button } from 'primereact/button';
import { Col, Container, Row } from 'react-bootstrap';

const CustomPagination = ({ page, setPage, totalPages }) => {
    const handleNextPage = () => {
        page < totalPages && setPage(page + 1);
    };

    const handlePrevPage = () => {
        page > 1 && setPage(page - 1);
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={6}>
                    <div className="d-flex justify-content-center align-items-center gap-3">
                        <Button
                            text
                            disabled={page === 1}
                            onClick={handlePrevPage}
                            icon="pi pi-arrow-circle-left"
                            className="text-warning shadow-none bg-transparent"
                        />
                        <span className="page-num fs-5">
                            {page === totalPages ? 'end' : page}
                        </span>
                        <Button
                            text
                            onClick={handleNextPage}
                            disabled={page === totalPages}
                            icon="pi pi-arrow-circle-right"
                            className="text-warning shadow-none bg-transparent"
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomPagination;
