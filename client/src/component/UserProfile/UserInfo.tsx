// import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import UserControls, { useGlobalState } from './UserControls';
import UserWeather from './UserWeather';
import UserPrivacy from './UserPrivacy';

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
      <HStack
      // className='u-hstack'
      className='pub-box'
      >

        <VStack className='u-edit-vstack'>
          {/* Edit Profile Select ************* */}
          <span
            id='g-link'
            className='u-link'
            onClick={() => setIsEditMode(!isEditMode)}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isEditMode ? 'Editing Complete' : 'Edit Profile'}
          </span>

          {/* Avatar  */}

          <GridItem
            id='u-avatar-gi'
            onClick={() => {
              if (isEditMode) {
                document.getElementById('avatarInput').click();
              }
            }}
            style={{ cursor: isEditMode ? 'pointer' : 'default' }}
          >
            <Image
              id='u-avatar-img'
              src={user.avatar}
              alt={isEditMode ? 'Click to Edit Avatar' : 'Avatar'}
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

            {isEditMode && (
              <EditIcon
                position='absolute'
                top='10px'
                right='10px'
                boxSize='24px'
                color='gray.500'
              />
            )}
          </GridItem>
        </VStack>

        <VStack className='u-edit-vstack'>
          {/* Edit Username ************************** */}

          <VStack
            // id='g-vstack'
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
                    UserControls.handleUserNameChange(
                      editableUserName,
                      setUser
                    );
                  }
                }}
                isDisabled={!editableUserName.trim()}
              >
                {/* Update */}
                <CheckIcon className='u-checkIcon' />
              </Button>
            </HStack>
          </VStack>

          <VStack
            // id='g-vstack'
            className='u-vstack'
          >
            <Text className='u-text'>Current Display Name:</Text>
            <Heading id='g-heading' className='u-heading'>
              {user.userName}
            </Heading>
          </VStack>

          {/* Edit Bio ************************** */}

          <VStack
            // id='g-vstack'
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

          <VStack
            // id='g-vstack'
            className='u-vstack'
          >
            <Text className='u-text'>Current User Bio</Text>

            <Heading id='g-heading' className='u-heading'>
              {user.bio}
            </Heading>
          </VStack>
        </VStack>
      </HStack>

{/* Import Privacy Toggles  */}
<Box className='pub-box'>
  <UserPrivacy user={user} fetchUserData={fetchUserData} isEditMode={isEditMode}  />
</Box>


      {/* Edit Location ************************** */}

      <VStack
        // id='g-vstack'
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

      <VStack
        // id='g-vstack'
        className='u-vstack'
      >
        <Text className='u-text'>Current City and State for Weather Watch</Text>
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
    </>
  );
};

export default UserInfo;
