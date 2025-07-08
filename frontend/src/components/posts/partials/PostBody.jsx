import { Button } from 'primereact/button';
import { useState } from 'react';

const PostBody = ({ post }) => {
    const [seeMore, setSeeMore] = useState(false);

    const handleSeeMore = () => {
        setSeeMore((prevState) => !prevState);
    };

    const { title, body } = post;

    return (
        <>
            <h5 className="fw-bold">{title}</h5>
            <p className={`${!seeMore && 'post-body'} mb-0`}>{body}</p>
            <Button
                link
                onClick={handleSeeMore}
                className="small p-0 shadow-none"
                label={`${seeMore ? 'hide' : 'see more...'}`}
            />
        </>
    );
};

export default PostBody;
