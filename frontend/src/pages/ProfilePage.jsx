import React, { useContext, useEffect } from 'react';
import BaseLayout from '../baseLayout/BaseLayout.jsx';
import Profile from '../components/profile/Profile.jsx';
import { UserContext } from '../contexts/UserContext.jsx';

const ProfilePage = () => {
    const { getMe, user } = useContext(UserContext);

    useEffect(() => {
        getMe();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <BaseLayout>{user && <Profile user={user} />}</BaseLayout>;
};

export default ProfilePage;
