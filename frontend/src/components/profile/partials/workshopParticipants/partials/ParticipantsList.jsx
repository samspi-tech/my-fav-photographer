import { ListGroup } from 'react-bootstrap';
import { Avatar } from 'primereact/avatar';

const ParticipantsList = ({ participant }) => {
    const { firstName, lastName, avatar } = participant;

    return (
        <>
            <ListGroup.Item className="d-flex align-items-center gap-2">
                <Avatar image={avatar} shape="circle" />
                <span className="text-capitalize fw-medium">
                    {firstName} {lastName}
                </span>
            </ListGroup.Item>
        </>
    );
};

export default ParticipantsList;
