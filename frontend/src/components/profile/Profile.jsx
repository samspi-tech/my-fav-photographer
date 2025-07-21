import './profile.css';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { useParams } from 'react-router-dom';
import { TabPanel, TabView } from 'primereact/tabview';
import { useContext, useEffect, useMemo } from 'react';
import ProfilePosts from './partials/profilePosts/ProfilePosts.jsx';
import { FollowerContext } from '../../contexts/FollowerContext.jsx';
import { getFromSessionStorage } from '../../utils/sessionStorage.js';
import ProfilePhotos from './partials/profilePhotos/ProfilePhotos.jsx';
import ProfileWorkshop from './partials/profileWorkshop/ProfileWorkshop.jsx';
import ProfileEquipment from './partials/profileEquipment/ProfileEquipment.jsx';

const Profile = ({ user }) => {
    const { firstName, lastName, avatar, _id: userId } = user;

    const {
        following,
        getFollowing,
        followPhotographer,
        unfollowPhotographer,
    } = useContext(FollowerContext);

    const followingList = useMemo(
        () => following && following.map((follow) => follow.photographerId._id),
        [following],
    );

    const { photographerId } = useParams();
    const loggedInUserId = getFromSessionStorage('userId');

    const loggedInUserRole = getFromSessionStorage('role');
    const isRoleUser = loggedInUserRole === 'user';

    useEffect(() => {
        getFollowing(loggedInUserId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photographerId]);

    return (
        <div
            className={`profile-hero ${isRoleUser ? 'profile-hero-user' : 'profile-hero-photographer'}`}
        >
            <div className="d-flex flex-column gap-3 align-items-center py-5">
                <Avatar
                    image={avatar}
                    shape="circle"
                    className="profile-avatar"
                />
                <h2 className="profile-name text-capitalize display-1">
                    {firstName} {lastName}
                </h2>
                {isRoleUser && (
                    <Button
                        label={
                            followingList &&
                            followingList.includes(photographerId)
                                ? 'Unfollow'
                                : 'Follow'
                        }
                        className="custom-btn shadow"
                        onClick={async () => {
                            followingList &&
                            followingList.includes(photographerId)
                                ? await unfollowPhotographer(
                                      loggedInUserId,
                                      photographerId,
                                  )
                                : await followPhotographer(
                                      loggedInUserId,
                                      photographerId,
                                  );

                            window.location.reload();
                        }}
                    />
                )}
            </div>
            <TabView className="profile-tabview d-flex flex-column align-items-center">
                <TabPanel header="Posts">
                    <ProfilePosts userId={userId} />
                </TabPanel>
                <TabPanel header="Gallery">
                    <ProfilePhotos user={user} />
                </TabPanel>
                <TabPanel header="Equipment">
                    <ProfileEquipment userId={userId} />
                </TabPanel>
                <TabPanel header="Workshop">
                    <ProfileWorkshop user={user} />
                </TabPanel>
            </TabView>
        </div>
    );
};

export default Profile;
