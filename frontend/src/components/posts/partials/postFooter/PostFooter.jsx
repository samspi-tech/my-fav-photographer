import { useContext } from 'react';
import Comments from '../../../comments/comments.jsx';
import VotePostButton from './partials/VotePostButton.jsx';
import { UserContext } from '../../../../contexts/UserContext.jsx';

const PostFooter = ({ post }) => {
    const { user } = useContext(UserContext);
    const { _id: userId } = user;

    const { _id: postId, upVotes, downVotes } = post;

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
                <Comments post={post} />
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
        </>
    );
};

export default PostFooter;
