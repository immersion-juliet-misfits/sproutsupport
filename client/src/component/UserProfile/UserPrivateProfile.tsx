// import axios from 'axios';
import { useState } from 'react';
import { Grid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserTabs from './UserTabs';
import UserInfo from './UserInfo';
import UserPrivacy from './UserPrivacy';
import TopBar from './TopBar';
import UserControls from './UserControls';

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
    <Grid className='privateBodyGrid' w='1100px' mx='auto'>
      <TopBar />
      <Grid
        className='bodyGrid'
        border='15px solid #D3FFEB'
        borderBottom='0'
        bg='#D3FFEB'
        w='1100px'
        mx='auto'
        borderRadius='lg'
        overflow='hidden'
        boxShadow='md'
        templateRows='1fr'
        templateColumns='1fr'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='flex-end'
      >
        <UserTabs
          handleLogOut={() => UserControls.handleLogOut(onLogout, navigate)}
          setCurrentView={setCurrentView}
        />
        <Grid
          w='1085px'
          mx='auto'
          mt='0'
          bg='#5AB78D'
          gap={10}
          overflow='hidden'
          boxShadow='md'
          templateRows='1fr'
          templateColumns='1fr'
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          py={4}
        >
          {currentView === 'info' && (
            <UserInfo
              user={user}
              avatar={user.avatar}
              bio={user.bio}
              city={user.city}
              state={user.state}
              userName={user.userName}
              fetchUserData={fetchUserData}
              fetchWeather={UserControls.fetchWeather}
              handleAvatarChange={(event) =>
                UserControls.handleAvatarChange(event, setUser, BUCKET_NAME)
              }
              handleBioChange={(newBio) =>
                UserControls.handleBioChange(newBio, setUser)
              }
              handleUserNameChange={(newUserName) =>
                UserControls.handleUserNameChange(newUserName, setUser)
              }
            />
          )}
          {currentView === 'help' && (
            <UserPrivacy user={user} fetchUserData={fetchUserData} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserPrivateProfile;
