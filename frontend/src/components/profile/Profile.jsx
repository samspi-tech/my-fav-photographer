import './profile.css';
import { Avatar } from 'primereact/avatar';
import { TabPanel, TabView } from 'primereact/tabview';
import ProfilePosts from './partials/ProfilePosts.jsx';
import ProfilePhotos from './partials/ProfilePhotos.jsx';

const Profile = ({ user }) => {
    const { firstName, lastName, avatar, _id: userId } = user;

    return (
        <div>
            <div className="d-flex flex-column gap-3 align-items-center py-5">
                <Avatar
                    image={avatar}
                    shape="circle"
                    className="profile-avatar"
                />
                <h2 className="fw-medium text-capitalize">
                    {firstName} {lastName}
                </h2>
            </div>
            <TabView className="profile-tabview d-flex flex-column align-items-center">
                <TabPanel header="Posts">
                    <ProfilePosts userId={userId} />
                </TabPanel>
                <TabPanel header="Gallery">
                    <ProfilePhotos userId={userId} />
                </TabPanel>
                <TabPanel header="Equipment">
                    <p>my equipment</p>
                </TabPanel>
                <TabPanel header="Workshop">
                    <p>my workshops</p>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default Profile;
