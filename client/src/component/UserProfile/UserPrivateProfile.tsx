import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Box,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  useEditableControls,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import UserTabs from './UserTabs';
import UserInfo from './UserInfo';
import UserPrivacy from './UserPrivacy';
import UserHelp from './UserHelp';

const UserPrivateProfile = ({ onLogout }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [location_id, setLocationId] = useState('');
  const [currentView, setCurrentView] = useState('info');

  const fetchUserData = () => {
    axios
      .get('/user/getUserData')
      .then((response) => {
        setUserName(response.data.userName);
        setBio(response.data.bio);
        setLocationId(response.data.location_id);
      })
      .catch((error) => {
        console.error('Fetch User Data: Failed ', error);
      });
  };

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
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
        // console.log('Verify Bio Change Response: ', response);
        setBio(newBio);
      })
      .catch((error) => {
        console.error('Update Bio: Failed ', error);
      });
  };

  const handleLocationChange = (newLocationId) => {
    axios
      .post('/user/updateLocation', { userId: 1, location_id: newLocationId })
      .then((response) => {
        // console.log('Verify Location Change Response: ', response);
        // Replace with data from location API later
        setLocationId(newLocationId);
      })
      .catch((error) => {
        console.error('Update Location: Failed ', error);
      });
  };

  const handleUserNameChange = (newUserName) => {
    axios
      .post('/user/updateUserName', { userId: 1, userName: newUserName })
      .then((response) => {
        // console.log('Verify UN Change Response: ', response);
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

  const goToPublicProfile = () => {
    navigate('/public-profile', { state: { bio, location_id, userName } });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Grid
      // border='5px solid purple'
      w='1100px'
      mx='auto'
      mt={10}
      p={5}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='md'
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
          // bg='blue.500'
          gap={10}
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <UserTabs
            handleLogOut={handleLogOut}
            setCurrentView={setCurrentView}
            goToPublicProfile={goToPublicProfile}
          />
          {currentView === 'info' && (
            <UserInfo
              bio={bio}
              location_id={location_id}
              userName={userName}
              EditableControls={EditableControls}
              handleAvatarChange={handleAvatarChange}
              handleBioChange={handleBioChange}
              handleLocationChange={handleLocationChange}
              handleUserNameChange={handleUserNameChange}
            />
          )}
          {currentView === 'privacy' && <UserPrivacy />}
          {currentView === 'help' && <UserHelp />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserPrivateProfile;
