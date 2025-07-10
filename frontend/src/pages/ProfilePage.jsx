import React, { useContext, useEffect } from 'react';
import BaseLayout from '../baseLayout/BaseLayout.jsx';
import { UserContext } from '../contexts/UserContext.jsx';

const ProfilePage = () => {
    const { getMe } = useContext(UserContext);

    useEffect(() => {
        getMe();
    }, []);

    return (
        <BaseLayout>
            <p>profile page</p>
        </BaseLayout>
    );
};

export default ProfilePage;
