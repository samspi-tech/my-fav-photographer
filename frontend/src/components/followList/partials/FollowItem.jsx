import { Avatar } from 'primereact/avatar';
import { ListGroup } from 'react-bootstrap';

const FollowItem = ({ followItem }) => {
    const { firstName, lastName, avatar } = followItem;

    return (
        <>
            <ListGroup.Item className="d-flex align-items-center gap-2">
                <Avatar shape="circle" image={avatar} />
                <span className="text-capitalize fw-medium">
                    {firstName} {lastName}
                </span>
            </ListGroup.Item>
        </>
    );
};

export default FollowItem;
