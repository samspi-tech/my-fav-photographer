import { Col } from 'react-bootstrap';
import PostBody from './PostBody.jsx';
import { Panel } from 'primereact/panel';
import PostHeader from './postHeader/PostHeader.jsx';
import PostFooter from './postFooter/PostFooter.jsx';

const SinglePost = ({ post }) => {
    return (
        <Col xs={12}>
            <Panel
                headerTemplate={<PostHeader post={post} />}
                footerTemplate={<PostFooter post={post} />}
            >
                <PostBody post={post} />
            </Panel>
        </Col>
    );
};

export default SinglePost;
