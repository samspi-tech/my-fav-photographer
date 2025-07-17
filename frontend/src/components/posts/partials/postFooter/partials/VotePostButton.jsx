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

    const handleVote = async () => {
        if (icon.includes('fill')) {
            await deleteVote(userVote, postId, loggedInUserId);
            await getAllPosts(loggedInUserId);
            return await getPhotographerPosts(postAuthorId);
        }

        await votePost(userVote, postId, loggedInUserId);
        await getAllPosts(loggedInUserId);
        await getPhotographerPosts(postAuthorId);
    };

    return (
        <div className="d-flex align-items-center">
            <small className="text-secondary">{vote}</small>
            <Button
                link
                icon={icon}
                onClick={handleVote}
                className="shadow-none rounded-circle text-secondary"
            />
        </div>
    );
};

export default VotePostButton;
