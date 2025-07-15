import { Col, Container, Row } from 'react-bootstrap';
import { TabPanel, TabView } from 'primereact/tabview';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext.jsx';
import UpdateProfile from './partials/UpdateProfile.jsx';
import { getFromSessionStorage } from '../../utils/sessionStorage.js';
import Addresses from './partials/addresses/Addresses.jsx';
import FollowList from '../followList/FollowList.jsx';

const Settings = () => {
    const { getMe, user } = useContext(UserContext);

    const loggedInUserRole = getFromSessionStorage('role');
    const isRoleUser = loggedInUserRole === 'user';

    useEffect(() => {
        getMe();
    }, []);

    return (
        <Container>
            <Row>
                <Col className="my-5">
                    <TabView className="profile-tabview d-flex flex-column align-items-center">
                        <TabPanel header="Profile" leftIcon="pi pi-user me-2">
                            {user && <UpdateProfile user={user} />}
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
