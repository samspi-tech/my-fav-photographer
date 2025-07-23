import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ListGroup } from 'react-bootstrap';
import ParticipantsList from './partials/ParticipantsList.jsx';
import CustomMessage from '../../../customMessage/CustomMessage.jsx';
import { getFromSessionStorage } from '../../../../utils/sessionStorage.js';

const WorkshopParticipants = ({
    workshop,
    participants,
    getParticipants,
    participateWorkshop,
    unsubscribeFromWorkshop,
}) => {
    const { _id: workshopId } = workshop;

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
                className="custom-dialog"
                onHide={handleVisibility}
                header="Whorkshop's participants"
            >
                <div>
                    {isRoleUser && (
                        <div className="d-flex justify-content-between mt-1 mb-3">
                            {isParticipant.length === 0 && (
                                <Button
                                    label="Participate"
                                    className="custom-btn p-1"
                                    onClick={async () => {
                                        await participateWorkshop(workshopId, {
                                            participantId: loggedInUserId,
                                        });
                                        await getParticipants(workshopId);
                                    }}
                                />
                            )}
                        </div>
                    )}
                </div>
                {participants.length === 0 && (
                    <CustomMessage error="No participants yet." />
                )}
                <ListGroup>
                    {participants.map((participant) => {
                        const { _id: key, participantId } = participant;

                        return (
                            <ParticipantsList
                                key={key}
                                workshopId={workshopId}
                                participant={participantId}
                                getParticipants={getParticipants}
                                unsubFromWorkshop={unsubscribeFromWorkshop}
                            />
                        );
                    })}
                </ListGroup>
            </Dialog>
        </>
    );
};

export default WorkshopParticipants;
