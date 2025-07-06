import Navigation from '../components/navigation/Navigation.jsx';

const BaseLayout = ({ children }) => {
    return (
        <>
            <Navigation />
            {children}
        </>
    );
};

export default BaseLayout;
