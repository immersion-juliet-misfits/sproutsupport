import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserInfo from './UserInfo';
import UserTabs from './UserTabs';

const UserPrivateProfile = ({ onLogout }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');

  const fetchUserData = () => {
    axios
      .get('/user/getUserData')
      .then((response) => {
        setUserName(response.data.userName);
        setBio(response.data.bio);
      })
      .catch((error) => {
        console.error('Fetch User Data: Failed ', error);
      });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Placeholder: need file upload logic
      console.log('Selected file:', file);
    }
  };

  const handleBioChange = (newBio) => {
    axios
      .post('/user/updateBio', { userId: 1, bio: newBio })
      .then((response) => {
        console.log('Verify Bio Change Response: ', response);
        setBio(newBio);
      })
      .catch((error) => {
        console.error('Update Bio: Failed ', error);
      });
  };

  const handleUserNameChange = (newUserName) => {
    axios
      .post('/user/updateUserName', { userId: 1, userName: newUserName })
      .then((response) => {
        console.log('Verify UN Change Response: ', response);
        setUserName(newUserName);
      })
      .catch((error) => {
        console.error('Update User Name: Failed ', error);
      });
  };

  const handleLogOut = () => {
    fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          onLogout();
          navigate('/login');
        } else {
          console.error('Logout: Failed');
        }
      })
      .catch((err) => {
        console.error('Logout: Failed', err);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Grid
      w='1100px'
      // border='5px solid purple'
    >
      {/* Below is a Placeholder header. It needs to be replaced by the bar that will be on every page eventually  */}
      <Grid
        // border='5px solid yellow'
        className='header-grid'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(5, 1fr)'
        h='100px'
        gap={4}
        mb={4}
      >
        <GridItem
          colSpan={1}
          bg='teal'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Box
            w='100px'
            h='100px'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            Site Logo
          </Box>
        </GridItem>
        <GridItem
          colSpan={3}
          bg='#c1e3c9'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Heading as='h1' size='2xl'>
            USER SETTINGS
          </Heading>
        </GridItem>
        <GridItem
          colSpan={1}
          bg='teal'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Box
            w='100px'
            h='100px'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            Hamburger Nav will be passed in here
          </Box>
        </GridItem>
      </Grid>
      <Grid
        className='content-grid'
        templateRows='1fr'
        templateColumns='1fr'
        bg='teal'
        alignItems='center'
        justifyContent='center'
        py={4}
      >
        <Grid
          // border='5px solid red'
          // colSpan={1}
          // bg='blue.500'
          gap={10}
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <UserTabs handleLogOut={handleLogOut} />
          <UserInfo
            userName={userName}
            bio={bio}
            handleAvatarChange={handleAvatarChange}
            handleBioChange={handleBioChange}
            handleUserNameChange={handleUserNameChange}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserPrivateProfile;
