import { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ListGroup } from 'react-bootstrap';
import ParticipantsList from './partials/ParticipantsList.jsx';
import CustomMessage from '../../../customMessage/CustomMessage.jsx';
import { WorkshopContext } from '../../../../contexts/WorkshopContext.jsx';
import { getFromSessionStorage } from '../../../../utils/sessionStorage.js';
import { useParticipateWorkshop } from '../../../../hooks/useParticipateWorkshop.js';

const WorkshopParticipants = ({ workshop }) => {
    const { participateWorkshop, unsubscribeFromWorkshop } =
        useParticipateWorkshop();

    const { getWorkshops } = useContext(WorkshopContext);

    const { participants, _id: workshopId, user: workshopAuthor } = workshop;
    const participantsNum = participants.length;
    const isSingular = participantsNum === 1 ? 'Participant' : 'Participants';

    const [isVisible, setIsVisible] = useState(false);
    const handleVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    const loggedInUserId = getFromSessionStorage('userId');
    const loggedInUserRole = getFromSessionStorage('role');
    const isRoleUser = loggedInUserRole === 'user';

    const isParticipant = participants.filter((participant) => {
        return participant.participantId._id === loggedInUserId;
    });

    return (
        <>
            <div className="participants-btn-container d-flex flex-column align-items-center">
                <Button
                    link
                    icon="pi pi-users"
                    onClick={handleVisibility}
                    className="shadow-none p-0"
                />
                <small>
                    {participantsNum} {isSingular}
                </small>
            </div>
            <Dialog
                focusOnShow={false}
                visible={isVisible}
                onHide={handleVisibility}
                className="custom-dialog"
                header="Whorkshop's participants"
            >
                {participantsNum === 0 && (
                    <CustomMessage error="No participants yet." />
                )}
                <div>
                    {isRoleUser && (
                        <div className="d-flex justify-content-between mb-3 mt-2">
                            {isParticipant.length === 0 && (
                                <Button
                                    label="Participate"
                                    className="custom-btn p-1"
                                    onClick={async () => {
                                        await participateWorkshop(workshopId, {
                                            participantId: loggedInUserId,
                                        });
                                        await getWorkshops(workshopAuthor);
                                    }}
                                />
                            )}
                            {isParticipant.length > 0 && (
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
                        </div>
                    )}
                </div>
                <ListGroup>
                    {participants.map((participant) => {
                        const { _id: key, participantId } = participant;

                        return (
                            <ParticipantsList
                                key={key}
                                participant={participantId}
                            />
                        );
                    })}
                </ListGroup>
            </Dialog>
        </>
    );
};

export default WorkshopParticipants;
