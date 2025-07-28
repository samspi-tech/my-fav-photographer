import './posts.css';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import SinglePost from './partials/SinglePost.jsx';
import { PostContext } from '../../../../../../contexts/PostContext.jsx';
import CustomMessage from '../../../../../customMessage/CustomMessage.jsx';
import { getFromSessionStorage } from '../../../../../../utils/sessionStorage.js';
import CustomPagination from '../../../../../customPagination/CustomPagination.jsx';

const Posts = () => {
    const { photographerId } = useParams();

    const {
        page,
        error,
        setPage,
        isLoading,
        totalPages,
        photographerPosts,
        getPhotographerPosts,
    } = useContext(PostContext);

    const loggedInUserId = getFromSessionStorage('userId');

    const postsPhotographerId = photographerId
        ? photographerId
        : loggedInUserId;

    useEffect(() => {
        getPhotographerPosts(postsPhotographerId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUserId, page]);

    return (
        <>
            <Row className="justify-content-center gy-5 mb-5">
                {isLoading && (
                    <CustomMessage loading={true} error="Loading posts..." />
                )}
                {!isLoading && error && <CustomMessage error={error} />}
                {photographerPosts &&
                    photographerPosts.posts.map((post) => {
                        const { _id: postId } = post;

                        return <SinglePost key={postId} post={post} />;
                    })}
            </Row>
            {totalPages > 1 && (
                <CustomPagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                />
            )}
        </>
    );
};

export default Posts;
