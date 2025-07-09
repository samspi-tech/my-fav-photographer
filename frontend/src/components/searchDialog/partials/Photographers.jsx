import { Link } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { ListGroup } from 'react-bootstrap';
import { useState } from 'react';

const Photographers = ({ photographer }) => {
    const [isHover, setIsHover] = useState(false);
    const { _id: photographerId, firstName, lastName, avatar } = photographer;

    return (
        <Link to={`/user/${photographerId}`} className="text-decoration-none">
            <ListGroup.Item
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="d-flex align-items-center gap-3 border-bottom-0 py-3"
            >
                <Avatar image={avatar} shape="circle" size="large" />
                <span className="text-capitalize fw-medium">
                    {firstName} {lastName}
                </span>
                {isHover && (
                    <small className="text-secondary">Visit profile</small>
                )}
            </ListGroup.Item>
        </Link>
    );
};

export default Photographers;
