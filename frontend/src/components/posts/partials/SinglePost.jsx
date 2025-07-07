import { Col } from 'react-bootstrap';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';

const SinglePost = ({ post }) => {
    const { title, body, user } = post;
    const { firstName, lastName, avatar } = user;
    const postCreator = `${firstName} ${lastName}`;

    return (
        <Col xs={12}>
            <Card title={title}>
                <small className="d-flex align-items-center gap-2 mb-2 text-secondary">
                    by <span className="text-capitalize">{postCreator}</span>
                    <span>{<Avatar image={avatar} shape="circle" />}</span>
                </small>
                <p>{body}</p>
            </Card>
        </Col>
    );
};

export default SinglePost;
