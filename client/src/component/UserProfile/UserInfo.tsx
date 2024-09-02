// import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import UserControls, { useGlobalState } from './UserControls';
import UserWeather from './UserWeather';

const UserInfo = ({
  fetchUserData,
  user,
  setUser,
  avatar,
  handleAvatarChange,
  userName,
  handleUserNameChange,
  bio,
  handleBioChange,
  city,
  state,
  handleLocationChange,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableUserName, setEditableUserName] = useState('');
  const [editableBio, setEditableBio] = useState('');
  const [editableCity, setEditableCity] = useState('');
  const [editableState, setEditableState] = useState('');

  // const [apiError, setApiError] = useState(false);
  // const [weatherData, setWeatherData] = useState(null);
  // const [dailyForecastData, setDailyForecastData] = useState(null);
  // const [alertsData, setAlertsData] = useState(null);

  // ******

  useEffect(() => {
    fetchUserData();
    setEditableUserName('');
    setEditableBio('');
    setEditableCity('');
    setEditableState('');
  }, [user.userName, userName, user.bio, bio, city, state]);

  return (
    <>
      <Grid id='u-avatar-grid'>
        <GridItem
          id='u-avatar-gi'
          onClick={() => document.getElementById('avatarInput').click()}
        >
          <Image id='u-avatar-img' src={avatar} alt='Click to Edit Avatar' />
          <input
            type='file'
            id='avatarInput'
            style={{ display: 'none' }}
            accept='.jpg, .jpeg, .png'
            onChange={handleAvatarChange}
          />
        </GridItem>
      </Grid>

      {/* ************* */}

      <HStack>
        <Button id='g-button' onClick={() => setIsEditMode(!isEditMode)}>
          {/* {isEditMode ? 'Cancel Edits' : 'Edit Profile'} */}
          {isEditMode ? 'Editing Complete' : 'Edit Profile'}
        </Button>

        {isEditMode && (
          <>
            {/*
             V2: WIP button to save all edits at once *********
              This version updates everything in the database, but only updates 1 of the 3 items on the front end.
            */}

            {/* <Button
              id='g-button'
              onClick={() => {
                Promise.resolve()
                  .then(() => {
                    if (editableUserName.trim() !== '') {
                      fetchUserData();
                      return handleUserNameChange(editableUserName, setUser);
                    }
                  })
                  .then(() => {
                    if (editableBio.trim() !== '') {
                      fetchUserData();
                      return handleBioChange(editableBio, setUser);
                    }
                  })
                  .then(() => {
                    if (
                      editableCity.trim() !== '' &&
                      editableState.trim() !== ''
                    ) {
                      fetchUserData();
                      return handleLocationChange(
                        editableCity,
                        editableState,
                        setUser
                      );
                    }
                  })
                  .then(() => {

                    setEditableUserName('');
                    setEditableBio('');
                    setEditableCity('');
                    setEditableState('');
                  })
                  .catch((err) => {
                    console.error(
                      'Handle functions or fetchUserData: Failed ',
                      err
                    );
                  });
              }}
            >
              Save Edits
            </Button> */}

            {/* V1: WIP button to save all edits at once *******  */}
            {/* <Button
              id='g-button'
              onClick={() => {
                handleUserNameChange(editableUserName, setUser);
                handleBioChange(editableBio);
                handleLocationChange(editableCity, editableState, setUser);
              }}
            >
              Test
            </Button> */}
          </>
        )}
      </HStack>

      {/* Edit Username ************************** */}

      <GridItem
        // id='g-gi'
        className='u-gi-changes'
      >
        <VStack
          id='g-vstack'
          className='u-vs-input'
          visibility={isEditMode ? 'visible' : 'hidden'}
        >
          <HStack id='g-hstack' className='u-hs-input' spacing={1}>
            <Input
              id='g-input'
              className='u-input'
              name='username'
              value={editableUserName}
              placeholder='Enter new User Name here'
              onChange={(e) => setEditableUserName(e.target.value)}
            />

            <Button
              id='g-button'
              className='u-check-button'
              onClick={() => {
                if (editableUserName.trim() !== '') {
                  handleUserNameChange(editableUserName, setUser);
                  // fetchUserData();
                  // setEditableUserName('');
                }
              }}
              isDisabled={!editableUserName.trim()}
            >
              {/* Update */}
              <CheckIcon className='u-checkIcon' />
            </Button>
          </HStack>
        </VStack>

        <VStack id='g-vstack' className='u-vstack'>
          <Text className='u-text'>Current Display Name:</Text>
          <Heading id='g-heading' className='u-heading'>
            {userName}
          </Heading>
        </VStack>
      </GridItem>
      {/* Edit Bio ************************** */}
      <GridItem
        // id='g-gi'
        className='u-gi-changes'
      >
        <VStack
          id='g-vstack'
          className='u-vs-input'
          visibility={isEditMode ? 'visible' : 'hidden'}
        >
          <HStack id='g-hstack' className='u-hs-input' spacing={1}>
            <Input
              id='g-input'
              className='u-input'
              name='bio'
              value={editableBio}
              placeholder='Enter new Bio here'
              onChange={(e) => setEditableBio(e.target.value)}
            />

            <Button
              id='g-button'
              className='u-check-button'
              onClick={() => {
                if (editableBio.trim() !== '') {
                  handleBioChange(editableBio, setUser);
                  // fetchUserData();
                  // setEditableBio('');
                }
              }}
              isDisabled={!editableBio.trim()}
            >
              {/* Update */}
              <CheckIcon className='u-checkIcon' />
            </Button>
          </HStack>
        </VStack>

        <VStack id='g-vstack' className='u-vstack'>
          <Text className='u-text'>Current User Bio</Text>

          <Heading id='g-heading' className='u-heading'>
            {bio}
          </Heading>
        </VStack>
      </GridItem>
      {/* Edit Location ************************** */}
      <GridItem
        // id='g-gi'
        className='u-gi-changes'
      >
        <VStack
          id='g-vstack'
          className='u-vs-input'
          visibility={isEditMode ? 'visible' : 'hidden'}
        >
          <HStack id='g-hstack' className='u-hs-input' spacing={1}>
            <Input
              id='g-input'
              className='u-input'
              name='city'
              value={editableCity}
              placeholder='Enter new City here'
              onChange={(e) => setEditableCity(e.target.value)}
            />

            <Input
              id='g-input'
              className='u-input'
              name='state'
              value={editableState}
              placeholder='Enter new State here'
              onChange={(e) => setEditableState(e.target.value)}
            />

            <Button
              id='g-button'
              className='u-check-button'
              onClick={() => {
                if (editableCity.trim() !== '' && editableState.trim() !== '') {
                  handleLocationChange(editableCity, editableState, setUser);
                  // fetchUserData();
                  // setEditableCity('');
                  // setEditableState('');
                }
              }}
              isDisabled={!editableCity.trim() || !editableState.trim()}
            >
              {/* Update */}
              <CheckIcon className='u-checkIcon' />
            </Button>
          </HStack>
        </VStack>

        <VStack id='g-vstack' className='u-vstack'>
          <Text className='u-text'>
            Current City and State for Weather Watch
          </Text>
          <p />
          <Heading id='g-heading' className='u-heading'>
            {user.city && user.state
              ? `${user.city}, ${user.state}`
              : 'No Location Watched'}
          </Heading>

          <UserWeather user={user} fetchUserData={fetchUserData} />
        </VStack>
      </GridItem>
    </>
  );
};

export default UserInfo;
