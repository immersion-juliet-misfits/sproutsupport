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

const UserInfo = ({ BUCKET_NAME, fetchUserData, setUser, user }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableUserName, setEditableUserName] = useState('');
  const [editableBio, setEditableBio] = useState('');
  const [editableCity, setEditableCity] = useState('');
  const [editableState, setEditableState] = useState('');

  useEffect(() => {
    fetchUserData();
    setEditableUserName('');
    setEditableBio('');
    setEditableCity('');
    setEditableState('');
  }, [user.userName, user.bio, user.city, user.state]);

  return (
    <>
      <Grid id='u-avatar-grid'>
        <GridItem
          id='u-avatar-gi'
          onClick={() => document.getElementById('avatarInput').click()}
        >
          <Image
            id='u-avatar-img'
            src={user.avatar}
            alt='Click to Edit Avatar'
          />
          <input
            type='file'
            id='avatarInput'
            style={{ display: 'none' }}
            accept='.jpg, .jpeg, .png'
            onChange={(event) =>
              UserControls.handleAvatarChange(event, setUser, BUCKET_NAME)
            }
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
                      return UserControls.handleUserNameChange(editableUserName, setUser);
                    }
                  })
                  .then(() => {
                    if (editableBio.trim() !== '') {
                      fetchUserData();
                      return UserControls.handleBioChange(editableBio, setUser);
                    }
                  })
                  .then(() => {
                    if (
                      editableCity.trim() !== '' &&
                      editableState.trim() !== ''
                    ) {
                      fetchUserData();
                      return UserControls.handleLocationChange(
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
                UserControls.handleUserNameChange(editableUserName, setUser);
                UserControls.handleBioChange(editableBio);
                UserControls.handleLocationChange(editableCity, editableState, setUser);
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
                  UserControls.handleUserNameChange(editableUserName, setUser);
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
            {user.userName}
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
                  UserControls.handleBioChange(editableBio, setUser);
                }
              }}
              isDisabled={!editableBio.trim()}
            >
              <CheckIcon className='u-checkIcon' />
            </Button>
          </HStack>
        </VStack>

        <VStack id='g-vstack' className='u-vstack'>
          <Text className='u-text'>Current User Bio</Text>

          <Heading id='g-heading' className='u-heading'>
            {user.bio}
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
                  UserControls.handleLocationChange(
                    editableCity,
                    editableState,
                    setUser
                  );
                }
              }}
              isDisabled={!editableCity.trim() || !editableState.trim()}
            >
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
            {user.city &&
            user.state &&
            user.city !== 'undefined' &&
            user.state !== 'undefined'
              ? `${user.city}, ${user.state}`
              : 'No Location Watched'}
          </Heading>

          <UserWeather
            user={user}
            setUser={setUser}
            fetchUserData={fetchUserData}
          />
        </VStack>
      </GridItem>
    </>
  );
};

export default UserInfo;
