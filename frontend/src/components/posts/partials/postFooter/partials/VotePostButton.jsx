import { useContext } from 'react';
import { Button } from 'primereact/button';
import { PostContext } from '../../../../../contexts/PostContext.jsx';

const VotePostButton = ({
    icon,
    vote,
    postId,
    userVote,
    loggedInUserId,
    postAuthorId,
}) => {
    const { votePost, deleteVote, getAllPosts, getPhotographerPosts } =
        useContext(PostContext);

    return (
        <div className="d-flex align-items-center">
            <small className="text-secondary">{vote}</small>
            <Button
                link
                icon={icon}
                onClick={async () => {
                    switch (true) {
                        case icon === 'pi pi-thumbs-down-fill':
                            return await deleteVote(
                                userVote,
                                postId,
                                loggedInUserId,
                            );
                        case icon === 'pi pi-thumbs-up-fill':
                            return await deleteVote(
                                userVote,
                                postId,
                                loggedInUserId,
                            );
                    }
                    await votePost(userVote, postId, loggedInUserId);
                    await getAllPosts();
                    await getPhotographerPosts(postAuthorId);
                }}
                className="shadow-none rounded-circle text-secondary"
            />
        </div>
    );
};

export default VotePostButton;
