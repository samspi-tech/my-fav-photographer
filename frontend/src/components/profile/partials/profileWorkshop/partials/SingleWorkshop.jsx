import { Col, Row } from 'react-bootstrap';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const SingleWorkshop = ({ workshop }) => {
    const { title, body, date, participants } = workshop;

    const workshopDate = date.split('T')[0];
    const participantsNum = participants.length;
    const isSingular = participantsNum === 1 ? 'Participant' : 'Participants';

    return (
        <Row>
            <Col>
                <Card className="workshop-card">
                    <header className="d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold">{title}</h5>
                        <small>
                            <span className="fw-medium">when:</span>{' '}
                            {workshopDate}
                        </small>
                    </header>
                    <div className="border-bottom border-top py-4">
                        <p className="mb-0">{body}</p>
                    </div>
                    <footer className="pt-3 d-flex">
                        <div className="d-flex flex-column align-items-center">
                            <Button
                                link
                                icon="pi pi-users"
                                className="shadow-none rounded-circle text-secondary p-0"
                            />
                            <small className="text-secondary">
                                {participantsNum} {isSingular}
                            </small>
                        </div>
                    </footer>
                </Card>
            </Col>
        </Row>
    );
};

export default SingleWorkshop;
