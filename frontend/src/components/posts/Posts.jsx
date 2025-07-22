import './posts.css';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import SinglePost from './partials/SinglePost.jsx';
import { PostContext } from '../../contexts/PostContext.jsx';
import CustomMessage from '../customMessage/CustomMessage.jsx';
import { getFromSessionStorage } from '../../utils/sessionStorage.js';
import CustomPagination from '../customPagination/CustomPagination.jsx';

const Posts = ({ isHomePage }) => {
    const { photographerId } = useParams();

    const {
        page,
        posts,
        error,
        setPage,
        isLoading,
        totalPages,
        getAllPosts,
        photographerPosts,
        getPhotographerPosts,
    } = useContext(PostContext);

    const loggedInUserId = getFromSessionStorage('userId');

    const postsPhotographerId = photographerId
        ? photographerId
        : loggedInUserId;

    useEffect(() => {
        isHomePage
            ? getAllPosts(loggedInUserId)
            : getPhotographerPosts(postsPhotographerId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUserId, page]);

    return (
        <>
            <Row className="justify-content-center gy-5 mb-5">
                {isLoading && (
                    <CustomMessage loading={true} error="Loading posts..." />
                )}
                {!isLoading && error && <CustomMessage error={error} />}
                {isHomePage
                    ? posts &&
                      posts
                          .reduce((acc, curr) => {
                              curr = curr.photographerId.posts;
                              return acc.concat(curr);
                          }, [])
                          .map((post) => {
                              const { _id: key } = post;
                              return <SinglePost key={key} post={post} />;
                          })
                    : photographerPosts &&
                      photographerPosts.posts.map((post) => {
                          const { _id: postId } = post;

                          return <SinglePost key={postId} post={post} />;
                      })}
            </Row>
            {!isHomePage && totalPages > 1 && (
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
