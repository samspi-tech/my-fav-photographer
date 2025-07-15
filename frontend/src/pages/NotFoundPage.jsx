import { useContext, useEffect } from 'react';
import BaseLayout from '../baseLayout/BaseLayout.jsx';
import { UserContext } from '../contexts/UserContext.jsx';
import PageNotFound from '../components/pageNotFound/PageNotFound.jsx';

const NotFoundPage = () => {
    const { getMe } = useContext(UserContext);

    useEffect(() => {
        getMe();
    }, []);

    return (
        <BaseLayout>
            <PageNotFound />
        </BaseLayout>
    );
};

export default NotFoundPage;
