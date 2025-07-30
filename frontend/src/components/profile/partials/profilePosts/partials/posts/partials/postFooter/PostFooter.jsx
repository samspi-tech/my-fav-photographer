import Comments from '../../../../../../../comments/Comments.jsx';
import VotePostButton from './partials/VotePostButton.jsx';
import { getFromSessionStorage } from '../../../../../../../../utils/sessionStorage.js';

const PostFooter = ({ post }) => {
    const loggedInUserId = getFromSessionStorage('userId');

    const { _id: postId, upVotes, downVotes, user } = post;
    const { _id: userId } = user;

    const upVotesNum = upVotes.length;
    const downVotesNum = downVotes.length;

    const isLoggedInUserVote = (votes, type) => {
        const vote = votes.filter((vote) => {
            return vote[type] === loggedInUserId;
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
                        loggedInUserId={loggedInUserId}
                        postAuthorId={userId}
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
                        loggedInUserId={loggedInUserId}
                        postAuthorId={userId}
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
