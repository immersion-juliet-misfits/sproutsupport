// import axios from 'axios';
import { useState } from 'react';
import { Card, Grid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserTabs from './UserTabs';
import UserInfo from './UserInfo';
import UserPrivacy from './UserPrivacy';
import TopBar from './TopBar';
import UserControls, { GlobalStateProvider } from './UserControls';

// User context
interface User {
  id: number;
  google_id: string;
  userName: string;
  email: string;
  avatar: string;
  bio: string;
  city: string;
  state: string;
}

// Main component
const UserPrivateProfile = ({
  user,
  setUser,
  onLogout,
  BUCKET_NAME,
  fetchUserData,
}) => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('info');

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <GlobalStateProvider>

        <TopBar />

      <Grid id='lvl-one'>
        <UserTabs
          handleLogOut={() => UserControls.handleLogOut(onLogout, navigate)}
          setCurrentView={setCurrentView}
        />

        <Grid id='lvl-two' className='u-pages'>
          {currentView === 'info' && (
            <UserInfo
              user={user}
              setUser={setUser}
              avatar={user.avatar}
              userName={user.userName}
              bio={user.bio}
              city={user.city}
              state={user.state}
              fetchUserData={fetchUserData}
              fetchWeather={UserControls.fetchWeather}
              handleAvatarChange={(event) =>
                UserControls.handleAvatarChange(event, setUser, BUCKET_NAME)
              }
              handleUserNameChange={(newUserName) =>
                UserControls.handleUserNameChange(newUserName, setUser)
              }
              handleBioChange={(newBio) =>
                UserControls.handleBioChange(newBio, setUser)
              }
              handleLocationChange={(newCity, newState) =>
                UserControls.handleLocationChange(newCity, newState, setUser)
              }
            />
          )}
          {currentView === 'help' && (
            <UserPrivacy user={user} fetchUserData={fetchUserData} />
          )}
        </Grid>
      </Grid>
    </GlobalStateProvider>
  );
};

export default UserPrivateProfile;
