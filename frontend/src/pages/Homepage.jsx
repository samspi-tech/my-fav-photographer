import { useContext, useEffect } from 'react';
import BaseLayout from '../baseLayout/BaseLayout.jsx';
import { UserContext } from '../contexts/UserContext.jsx';

const Homepage = () => {
    const { getMe } = useContext(UserContext);

    useEffect(() => {
        getMe();
    }, []);

    return (
        <BaseLayout>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h1 className="display-1 fw-bold">Homepage</h1>
            </div>
        </BaseLayout>
    );
};

export default Homepage;
