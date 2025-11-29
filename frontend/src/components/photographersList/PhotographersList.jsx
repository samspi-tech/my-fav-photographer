import { Row, Col } from 'react-bootstrap';
import { usePhotographersQuery } from '@/reactQuery/queries/usePhotographersQuery.js';
import PhotographerCard from './partials/PhotographerCard';

const PhotographersList = () => {
    const { data, isPending, error } = usePhotographersQuery();

    if (isPending) return <p>loading</p>;
    if (error) return <p>error</p>;

    const { photographers } = data;

    return (
        <Row className="py-5 g-3">
            {photographers.map((photographer) => {
                return (
                    <Col md={6} lg={4} xl={3} key={photographer._id}>
                        <PhotographerCard photographer={photographer} />
                    </Col>
                );
            })}
        </Row>
    );
};

export default PhotographersList;
