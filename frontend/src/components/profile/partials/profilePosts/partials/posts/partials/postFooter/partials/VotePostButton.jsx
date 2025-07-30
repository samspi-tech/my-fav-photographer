import { useContext } from 'react';
import { Button } from 'primereact/button';
import { PostContext } from '../../../../../../../../../contexts/PostContext.jsx';
import { getFromSessionStorage } from '../../../../../../../../../utils/sessionStorage.js';

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

    const loggedInUserRole = getFromSessionStorage('role');
    const isRoleUser = loggedInUserRole === 'user';

    const handleVote = async () => {
        if (icon.includes('fill')) {
            await deleteVote(userVote, postId, loggedInUserId);
            isRoleUser && (await getAllPosts(loggedInUserId));
            return await getPhotographerPosts(postAuthorId);
        }

        await votePost(userVote, postId, loggedInUserId);
        isRoleUser && (await getAllPosts(loggedInUserId));
        await getPhotographerPosts(postAuthorId);
    };

    return (
        <div className="vote-btn-container d-flex align-items-center">
            <small>{vote}</small>
            <Button
                link
                icon={icon}
                onClick={handleVote}
                className="shadow-none"
            />
        </div>
    );
};

export default VotePostButton;
