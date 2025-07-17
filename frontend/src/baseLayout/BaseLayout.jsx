import Navigation from '../components/navigation/Navigation.jsx';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';

const BaseLayout = ({ children }) => {
    const { getMe } = useContext(UserContext);
    
    useEffect(() => {
        getMe();
    }, []);

    return (
        <>
            <Navigation />
            {children}
        </>
    );
};

export default BaseLayout;
