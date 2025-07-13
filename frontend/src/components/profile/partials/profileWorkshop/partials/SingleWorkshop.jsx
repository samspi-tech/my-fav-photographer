import { Card } from 'primereact/card';
import { Col, Row } from 'react-bootstrap';
import { Button } from 'primereact/button';
import WorkshopMenu from './WorkshopMenu.jsx';

const SingleWorkshop = ({ workshop, user }) => {
    const { _id: loggedInUserId, role } = user;
    const { title, body, date, participants, user: workshopAuthor } = workshop;

    const isActionAllowed =
        loggedInUserId === workshopAuthor && role === 'photographer';

    const workshopDate = date.split('T')[0];
    const participantsNum = participants.length;
    const isSingular = participantsNum === 1 ? 'Participant' : 'Participants';

    return (
        <Row>
            <Col>
                <Card className="workshop-card">
                    <header className="d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold">{title}</h5>
                        {isActionAllowed && (
                            <WorkshopMenu workshop={workshop} />
                        )}
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
                        <small className="ms-auto mt-auto">
                            <span className="fw-medium">when:</span>{' '}
                            {workshopDate}
                        </small>
                    </footer>
                </Card>
            </Col>
        </Row>
    );
};

export default SingleWorkshop;
