import { useContext } from 'react';
import Comments from '../../../comments/Comments.jsx';
import VotePostButton from './partials/VotePostButton.jsx';
import { UserContext } from '../../../../contexts/UserContext.jsx';

const PostFooter = ({ post }) => {
    const { user } = useContext(UserContext);

    const { _id: postId, upVotes, downVotes } = post;

    const upVotesNum = upVotes.length;
    const downVotesNum = downVotes.length;

    const isLoggedInUserVote = (votes, type) => {
        const vote = votes.filter((vote) => {
            if (user) return vote[type] === user._id;
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
                        userId={user && user._id}
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
                        userId={user && user._id}
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
