import { Row, Col } from 'react-bootstrap';
import { usePhotographersQuery } from '@/reactQuery/queries/usePhotographersQuery.js';
import PhotographerCard from './partials/PhotographerCard';
import CustomSpinner from '../customSpinner/CustomSpinner';

const PhotographersList = () => {
    const { data, isPending, error } = usePhotographersQuery();

    if (isPending) return <CustomSpinner />;
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
