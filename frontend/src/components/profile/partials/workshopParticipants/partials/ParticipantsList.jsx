import { useContext } from 'react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { ListGroup } from 'react-bootstrap';
import { WorkshopContext } from '../../../../../contexts/WorkshopContext.jsx';
import { getFromSessionStorage } from '../../../../../utils/sessionStorage.js';
import { useParticipateWorkshop } from '../../../../../hooks/useParticipateWorkshop.js';

const ParticipantsList = ({ participant, workshopId, workshopAuthor }) => {
    const { firstName, lastName, avatar, _id: participantId } = participant;

    const loggedInUserId = getFromSessionStorage('userId');

    const { getWorkshops } = useContext(WorkshopContext);
    const { unsubscribeFromWorkshop } = useParticipateWorkshop();

    return (
        <ListGroup.Item className="participant-item d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
                <Avatar image={avatar} shape="circle" size="large" />
                <span className="text-capitalize fw-medium">
                    {firstName} {lastName}
                </span>
            </div>
            {participantId === loggedInUserId && (
                <Button
                    label="Unsubscribe"
                    className="custom-btn p-1"
                    onClick={async () => {
                        await unsubscribeFromWorkshop(
                            workshopId,
                            loggedInUserId,
                        );
                        await getWorkshops(workshopAuthor);
                    }}
                />
            )}
        </ListGroup.Item>
    );
};

export default ParticipantsList;
