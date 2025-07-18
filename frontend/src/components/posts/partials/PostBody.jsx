import { Button } from 'primereact/button';
import { useState } from 'react';

const PostBody = ({ post }) => {
    const [seeMore, setSeeMore] = useState(false);

    const handleSeeMore = () => {
        setSeeMore((prevState) => !prevState);
    };

    const { title, body } = post;

    return (
        <div className="post-body-container">
            <h5 className="fw-bold">{title}</h5>
            <p
                className={`${seeMore ? 'post-body-length' : 'post-body'}  mb-0`}
            >
                {body}
            </p>
            <Button
                link
                onClick={handleSeeMore}
                className="small p-0 shadow-none see-more-btn"
                label={`${seeMore ? 'hide' : '...see more'}`}
            />
        </div>
    );
};

export default PostBody;
