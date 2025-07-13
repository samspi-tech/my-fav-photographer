import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import CustomMessage from '../../../customMessage/CustomMessage.jsx';
import ParticipantsList from './partials/ParticipantsList.jsx';
import { ListGroup } from 'react-bootstrap';

const WorkshopParticipants = ({ workshop }) => {
    const { participants } = workshop;
    const participantsNum = participants.length;
    const isSingular = participantsNum === 1 ? 'Participant' : 'Participants';

    const [isVisible, setIsVisible] = useState(false);
    const handleVisibility = () => {
        setIsVisible((prevState) => !prevState);
    };

    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <Button
                    link
                    icon="pi pi-users"
                    onClick={handleVisibility}
                    className="shadow-none rounded-circle text-secondary p-0"
                />
                <small className="text-secondary">
                    {participantsNum} {isSingular}
                </small>
            </div>
            <Dialog
                visible={isVisible}
                onHide={handleVisibility}
                className="custom-dialog"
                header="Whorkshop's participants"
            >
                <ul className="p-0 m-0">
                    {participantsNum === 0 && (
                        <CustomMessage error="No participants yet" />
                    )}
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
                </ul>
            </Dialog>
        </>
    );
};

export default WorkshopParticipants;
