import { Row, Col } from 'react-bootstrap';
import { usePhotographersQuery } from '@/reactQuery/queries/usePhotographersQuery.js';

const PhotographersList = () => {
    const { data, isPending, error } = usePhotographersQuery();

    if (isPending) return <p>loading</p>;
    if (error) return <p>error</p>;

    const { photographers } = data;

    return (
        <Row className="py-5">
            {photographers.map((photographer, i) => {
                return (
                    <Col md={4} lg={6} key={`photo-${i}`}>
                        <p>{photographer.username}</p>
                    </Col>
                );
            })}
        </Row>
    );
};

export default PhotographersList;
