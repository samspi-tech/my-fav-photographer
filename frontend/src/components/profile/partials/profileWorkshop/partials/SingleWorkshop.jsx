import { Col } from 'react-bootstrap';
import { Card } from 'primereact/card';
import WorkshopMenu from './WorkshopMenu.jsx';
import WorkshopParticipants from '../../workshopParticipants/WorkshopParticipants.jsx';

const SingleWorkshop = ({ workshop, isActionAllowed }) => {
    const { title, body, date } = workshop;

    const formatDate = date.split('T');
    const workshopDate = formatDate[0];
    const workshopTime = formatDate[1].slice(0, 5);

    const workshopTitle = (
        <header className="d-flex justify-content-between align-items-center">
            <h5 className="workshop-title fw-bold mb-0">{title}</h5>
            {isActionAllowed && <WorkshopMenu workshop={workshop} />}
        </header>
    );

    const workshopFooter = (
        <footer className="d-flex">
            <WorkshopParticipants workshop={workshop} />
            <div className="workshop-details d-flex flex-column gap-2 ms-auto">
                <small>
                    <span className="fw-bold">when:</span> {workshopDate}
                </small>
                <small>
                    <span className="fw-bold">at:</span> {workshopTime}
                </small>
            </div>
        </footer>
    );

    return (
        <Col xs={12}>
            <Card
                title={workshopTitle}
                footer={workshopFooter}
                className="workshop-card card"
            >
                <div className="border-bottom border-top py-4">
                    <p className="mb-0">{body}</p>
                </div>
            </Card>
        </Col>
    );
};

export default SingleWorkshop;
