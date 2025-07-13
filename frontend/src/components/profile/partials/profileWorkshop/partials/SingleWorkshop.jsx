import { Col } from 'react-bootstrap';
import { Card } from 'primereact/card';
import WorkshopMenu from './WorkshopMenu.jsx';
import WorkshopParticipants from '../../workshopParticipants/WorkshopParticipants.jsx';

const SingleWorkshop = ({ workshop, isActionAllowed }) => {
    const { title, body, date } = workshop;

    const formatDate = date.split('T');
    const workshopDate = formatDate[0];
    const workshopTime = formatDate[1].slice(0, 5);

    return (
        <Col xs={12}>
            <Card className="workshop-card">
                <header className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold">{title}</h5>
                    {isActionAllowed && <WorkshopMenu workshop={workshop} />}
                </header>
                <div className="border-bottom border-top py-4">
                    <p className="mb-0">{body}</p>
                </div>
                <footer className="pt-3 d-flex">
                    <WorkshopParticipants workshop={workshop} />
                    <div className="d-flex flex-column gap-2 ms-auto">
                        <small>
                            <span className="fw-medium">when:</span>{' '}
                            {workshopDate}
                        </small>
                        <small>
                            <span className="fw-medium">at:</span>{' '}
                            {workshopTime}
                        </small>
                    </div>
                </footer>
            </Card>
        </Col>
    );
};

export default SingleWorkshop;
