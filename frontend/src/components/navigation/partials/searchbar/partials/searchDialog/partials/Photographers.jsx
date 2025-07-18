import { Link } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { ListGroup } from 'react-bootstrap';
import { useState } from 'react';

const Photographers = ({ photographer }) => {
    const [isHover, setIsHover] = useState(false);
    const { _id: photographerId, firstName, lastName, avatar } = photographer;

    return (
        <Link
            className="text-decoration-none"
            to={`/photographer/${photographerId}`}
        >
            <ListGroup.Item
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="search-bar-item d-flex align-items-center gap-3 border-bottom-0 py-3"
            >
                <Avatar image={avatar} shape="circle" size="large" />
                <span className="photographer-name text-capitalize fw-bold">
                    {firstName} {lastName}
                </span>
                {isHover && (
                    <small className="visit-text fw-bold ms-auto">
                        Visit profile
                    </small>
                )}
            </ListGroup.Item>
        </Link>
    );
};

export default Photographers;
