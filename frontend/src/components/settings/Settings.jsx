import './settings.css';
import { useContext, useEffect } from 'react';
import ProfileForm from './partials/ProfileForm.jsx';
import { Col, Container, Row } from 'react-bootstrap';
import FollowList from '../followList/FollowList.jsx';
import { TabPanel, TabView } from 'primereact/tabview';
import Addresses from './partials/addresses/Addresses.jsx';
import { UserContext } from '../../contexts/UserContext.jsx';
import { getFromSessionStorage } from '../../utils/sessionStorage.js';

const Settings = () => {
    const { getMe, user } = useContext(UserContext);

    const loggedInUserRole = getFromSessionStorage('role');
    const isRoleUser = loggedInUserRole === 'user';

    useEffect(() => {
        getMe();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Row>
                <Col className="my-5">
                    <TabView className="profile-tabview d-flex flex-column align-items-center">
                        <TabPanel
                            header="Profile Details"
                            leftIcon="pi pi-user me-2"
                        >
                            {user && <ProfileForm user={user} />}
                        </TabPanel>
                        {isRoleUser && (
                            <TabPanel
                                header="Addresses"
                                leftIcon="pi pi-address-book me-2"
                            >
                                <Addresses />
                            </TabPanel>
                        )}
                        {isRoleUser && (
                            <TabPanel
                                header="Following"
                                leftIcon="pi pi-camera me-2"
                            >
                                <Row className="justify-content-center">
                                    <Col lg={6}>
                                        <FollowList />
                                    </Col>
                                </Row>
                            </TabPanel>
                        )}
                    </TabView>
                </Col>
            </Row>
        </Container>
    );
};

export default Settings;
