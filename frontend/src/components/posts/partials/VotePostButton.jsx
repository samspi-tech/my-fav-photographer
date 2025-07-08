import { Button } from 'primereact/button';
import { useContext } from 'react';
import { PostContext } from '../../../contexts/PostContext.jsx';

const VotePostButton = ({ icon, vote, postId, userVote, userId }) => {
    const { votePost, deleteVote } = useContext(PostContext);

    return (
        <div className="d-flex align-items-center">
            <small className="text-secondary">{vote}</small>
            <Button
                link
                icon={icon}
                onClick={() => {
                    switch (true) {
                        case icon === 'pi pi-thumbs-down-fill':
                            return deleteVote(userVote, postId, userId);
                        case icon === 'pi pi-thumbs-up-fill':
                            return deleteVote(userVote, postId, userId);
                    }
                    votePost(userVote, postId, userId);
                }}
                className="shadow-none rounded-circle text-secondary"
            />
        </div>
    );
};

export default VotePostButton;
