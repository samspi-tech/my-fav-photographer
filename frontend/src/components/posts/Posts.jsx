import './posts.css';
import { Row } from 'react-bootstrap';
import SinglePost from './partials/SinglePost.jsx';

const Posts = ({ posts }) => {
    return (
        <Row className="justify-content-center gy-5">
            {posts.map((post) => {
                const { _id: postId } = post;

                return <SinglePost key={postId} post={post} />;
            })}
        </Row>
    );
};

export default Posts;
