import { Col } from 'react-bootstrap';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { useContext, useState } from 'react';
import { FollowerContext } from '../../../contexts/FollowerContext.jsx';

const PhotographerCard = ({ user, photographer, setIsDisabled }) => {
    const { followPhotographer } = useContext(FollowerContext);

    const { avatar, firstName, lastName, _id: photographerId } = photographer;

    const [isFollow, setIsFollow] = useState(false);

    const handleFollow = () => {
        if (user) {
            const { _id: userId } = user;

            setIsDisabled(false);
            setIsFollow(true);
            followPhotographer(userId, photographerId);
        }
    };

    return (
        <Col xs={12} md={6} lg={4}>
            <div className="photographer-card d-flex align-items-center gap-3 shadow">
                <Avatar image={avatar} size="xlarge" shape="circle" />
                <p className="text-capitalize mb-0">
                    {firstName} {lastName}
                </p>
                <Button
                    disabled={isFollow}
                    onClick={handleFollow}
                    className="custom-btn py-2 ms-auto"
                    icon={isFollow && 'pi pi-check-circle'}
                    label={isFollow ? 'Followed' : 'Follow'}
                />
            </div>
        </Col>
    );
};

export default PhotographerCard;
