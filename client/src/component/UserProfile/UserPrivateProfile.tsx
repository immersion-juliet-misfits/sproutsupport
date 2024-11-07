import { useState } from 'react';
import { Grid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import UserTabs from './UserTabs';
import UserInfo from './UserInfo';
import UserWeather from './UserWeather';
import UserSearch from './UserSearch';

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

const UserPrivateProfile = ({
  fetchUserData,
  user,
  setUser,
  onLogout,
  BUCKET_NAME,
}) => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('profileInfo');

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TopBar route={'Settings'} />

      <Grid id='lvl-one'>
        <UserTabs setCurrentView={setCurrentView} />

        <Grid>
          {currentView === 'userSearch' && <UserSearch />}
          {currentView === 'weather' && (
            <UserWeather
              fetchUserData={fetchUserData}
              user={user}
              setUser={setUser}
            />
          )}
          {currentView === 'profileInfo' && (
            <UserInfo
              BUCKET_NAME={BUCKET_NAME}
              fetchUserData={fetchUserData}
              setUser={setUser}
              user={user}
              onLogout={onLogout}
              navigate={navigate}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default UserPrivateProfile;
