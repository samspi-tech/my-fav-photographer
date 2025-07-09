import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useContext, useState } from 'react';
import VotePostButton from './partials/VotePostButton.jsx';
import Comments from '../../../comments/comments.jsx';
import { UserContext } from '../../../../contexts/UserContext.jsx';

const PostFooter = ({ post }) => {
    const { user } = useContext(UserContext);
    const { _id: userId } = user;

    const [isVisible, setIsVisible] = useState(false);

    const handleIsVisible = () => {
        setIsVisible((prevState) => !prevState);
    };

    const { _id: postId, comments, upVotes, downVotes } = post;
    const commentsNum = comments.length;

    const upVotesNum = upVotes.length;
    const downVotesNum = downVotes.length;

    const isLoggedInUserVote = (votes, type) => {
        const vote = votes.filter((vote) => {
            return vote[type] === userId;
        });

        return vote.length !== 0;
    };

    return (
        <>
            <div className="post-footer d-flex py-2 px-3">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Button
                        link
                        icon="pi pi-comments"
                        onClick={handleIsVisible}
                        className="shadow-none rounded-circle text-secondary"
                    />
                    <small className="text-secondary">
                        {commentsNum} Comments
                    </small>
                </div>
                <div className="ms-auto d-flex gap-2">
                    <VotePostButton
                        postId={postId}
                        userId={userId}
                        vote={upVotesNum}
                        userVote="upvote"
                        icon={
                            isLoggedInUserVote(upVotes, 'upVote')
                                ? 'pi pi-thumbs-up-fill'
                                : 'pi pi-thumbs-up'
                        }
                    />
                    <VotePostButton
                        postId={postId}
                        userId={userId}
                        userVote="downvote"
                        vote={downVotesNum}
                        icon={
                            isLoggedInUserVote(downVotes, 'downVote')
                                ? 'pi pi-thumbs-down-fill'
                                : 'pi pi-thumbs-down'
                        }
                    />
                </div>
            </div>
            <Dialog
                header="Comments"
                visible={isVisible}
                onHide={handleIsVisible}
            >
                <div className="d-flex flex-column gap-2">
                    <Comments post={post} />
                </div>
            </Dialog>
        </>
    );
};

export default PostFooter;
