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
import NavBar from '../NavBar';
import UserTabs from './UserTabs';
import UserInfo from './UserInfo';
import UserPrivacy from './UserPrivacy';
import UserHelp from './UserHelp';

// User context
interface User {
  id: number;
  google_id: string;
  userName: string;
  email: string;
  avatar: string;
  bio: string;
  // location_id: string;
  latitude: float;
  longitude: float;
}

// Main component
const UserPrivateProfile = ({ user, setUser, onLogout }) => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('info');
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);

  const EditableControls = () => {
    const {
      isEditing,
      getCancelButtonProps,
      getSubmitButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup size='sm' position='absolute'>
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex position='absolute'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      axios
        .get('/upload/url', { params: { filename: file.name } })
        .then(({ data }) => {
          return axios.put(data, file, {
            headers: { 'Content-Type': file.type },
          });
        })
        .then(() => {
          const newAvatarUrl = `https://my1test1bucket.s3.amazonaws.com/${file.name}`;
          return axios
            .patch('/user/updateAvatar', {
              avatar: newAvatarUrl,
            })
            .then((response) => {
              return setUser(response.data);
            });
        })
        .catch((err) => {
          console.error('Failed to get image url', err);
        });
    }
  };

  const handleUserNameChange = (newUserName: string) => {
    axios
      .patch('/user/updateUserName', { userName: newUserName })
      .then((response) => {
        return setUser(response.data);
      })
      .catch((error) => {
        console.error('Update User Name: Failed ', error);
      });
  };

  // const handleLocationChange = (newLocationId: number) => {
  //   axios
  //     .patch('/user/updateLocation', { location_id: newLocationId })
  //     .then((response) => {
  //       return setUser(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Update Location: Failed ', error);
  //     });
  // };

  const handleLatLonChange = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setLatitude(latitude);
          setLongitude(longitude);

          axios
            .patch('/user/updateLatLon', { latitude, longitude })
            .then((response) => {
              setUser(response.data);
            })
            .catch((error) => {
              console.error('Update GeoLocation: Failed ', error);
            });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleBioChange = (newBio: string) => {
    axios
      .patch('/user/updateBio', { bio: newBio })
      .then((response) => {
        return setUser(response.data);
      })
      .catch((error) => {
        console.error('Update Bio: Failed ', error);
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
    navigate('/public-profile', {
      state: {
        avatar: user.avatar,
        bio: user.bio,
        latitude: user.latitude,
        longitude: user.longitude,
        userName: user.userName,
      },
    });
  };

  useEffect(() => {
    // console.log('Use Effect User Check: ', user);
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

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
            <NavBar />
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
              avatar={user.avatar}
              bio={user.bio}
              // location_id={user.location_id}
              latitude={user.latitude}
              longitude={user.longitude}
              userName={user.userName}
              EditableControls={EditableControls}
              handleAvatarChange={handleAvatarChange}
              handleBioChange={handleBioChange}
              handleLatLonChange={handleLatLonChange}
              // handleLocationChange={handleLocationChange}
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
