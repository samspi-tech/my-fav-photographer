import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import BaseLayout from '../baseLayout/BaseLayout.jsx';
import Profile from '../components/profile/Profile.jsx';
import { UserContext } from '../contexts/UserContext.jsx';
import CustomMessage from '../components/customMessage/CustomMessage.jsx';

const PhotographerPage = () => {
    const { photographerId } = useParams();

    const { error, isLoading, getSinglePhotographer, singlePhotographer } =
        useContext(UserContext);

    useEffect(() => {
        getSinglePhotographer(photographerId);
    }, []);

    return (
        <BaseLayout>
            {isLoading && <CustomMessage error="Loading..." />}
            {!isLoading && error && <CustomMessage error={error} />}
            {!isLoading && !error && singlePhotographer && (
                <Profile user={singlePhotographer} />
            )}
        </BaseLayout>
    );
};

export default PhotographerPage;
