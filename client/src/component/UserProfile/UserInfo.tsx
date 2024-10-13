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
import UserToggles from './UserToggles';
import UserSearch from './UserSearch';

const UserInfo = ({
  BUCKET_NAME,
  fetchUserData,
  setUser,
  user,
  onLogout,
  navigate,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableUserName, setEditableUserName] = useState('');
  const [editableBio, setEditableBio] = useState('');

  useEffect(() => {
    fetchUserData();
    setEditableUserName('');
    setEditableBio('');
  }, [user.userName, user.bio]);

  return (
    <>
      <HStack
      // border='2px solid blue'
      className='u-top-hstack'
      >
        {/* Edit Profile Select ************* */}
        {/* <span
          id='g-link'
          className='u-link'
          onClick={() => setIsEditMode(!isEditMode)}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isEditMode ? 'Editing Complete' : 'Edit Profile'}
        </span> */}

        <Button
          colorScheme='blue'
          // id='g-link'
          // className='u-link'
          onClick={() => setIsEditMode(!isEditMode)}
          // style={{
          //   cursor: 'pointer',
          //   textDecoration: 'underline',
          //   background: 'none',
          //   border: 'none',
          //   padding: '0',
          // }}
        >
          {isEditMode ? 'Save Changes' : 'Edit Profile'}
        </Button>

        <Button
          colorScheme='blue'
          isDisabled={isEditMode}
          onClick={() => UserControls.handleLogOut(onLogout, navigate)}
        >
          Log Out
        </Button>
      </HStack>

      <HStack
        // className='u-hstack'
        className='pub-box'
      >
        <VStack className='u-edit-vstack'>
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

        {/* Edit Boxes Start ************************** */}
        <VStack
          // border='5px dashed purple'
          id='g-vstack'
          className='u-vstack'
        >
          {/* Edit Username Start ************************** */}

          <VStack
            id='g-vstack'
            className='u-vstack'
            // border='5px dashed green'
          >
            <VStack
              // id='g-vstack'
              className='u-vs-input'
            >
              <HStack
                id='g-hstack'
                className='u-hs-input'
                spacing={1}
              >
                <Input
                  id='g-input'
                  className='u-input'
                  name='username'
                  value={editableUserName}
                  placeholder='Enter new User Name here'
                  isDisabled={!isEditMode}
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

            <Text className='u-text'>Current Display Name:</Text>
            <Heading
              id='g-heading'
              className='u-heading'
            >
              {user.userName}
            </Heading>
          </VStack>

          {/* Edit Username End ************************** */}

          {/* Edit Bio Start ************************** */}

          <VStack className='u-vs-input'>
            <HStack
              id='g-hstack'
              className='u-hs-input'
              spacing={1}
            >
              <Input
                id='g-input'
                className='u-input'
                name='bio'
                value={editableBio}
                placeholder='Enter new Bio here'
                isDisabled={!isEditMode}
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

          {/* Edit Bio End ************************** */}

          <Text className='u-text'>Current User Bio</Text>
          <Text className='u-text'>{user.bio}</Text>
        </VStack>

        {/* Edit Boxes Start ************************** */}
      </HStack>

      {/* Import Privacy Toggles  */}
      <Box className='pub-box'>
        <UserToggles
          user={user}
          fetchUserData={fetchUserData}
          isEditMode={isEditMode}
        />
      </Box>

      {/* Log Out & Delete Account Box  */}
      <Box
      // className='pub-box'
      >
        <HStack className='u-hstack'>
          <Button
            colorScheme='red'
            isDisabled={!isEditMode}
            onClick={() => {
              if (
                window.confirm('Are you sure you want to delete your account?')
              ) {
                UserControls.deleteAccount(setUser)
                  .then(() => {
                    onLogout();
                    navigate('/login');
                  })
                  .catch((err) => {
                    console.error('Error during account deletion:', err);
                  });
              }
            }}
          >
            Delete Account
          </Button>

          {/* <Button
            colorScheme='blue'
            isDisabled={isEditMode}
            onClick={() => UserControls.handleLogOut(onLogout, navigate)}
          >
            Log Out
          </Button> */}
        </HStack>
      </Box>

      {/* Stretch Goal Skeletons  */}
      {/* <GridItem bg='green.500' h='150px'>
          Blocking - Enter the name of the User you want to block. <p>
            You will no longer see each others: profiles, forum posts, or Meet Ups. </p>
        </GridItem>
        <GridItem bg='green.500' h='150px'>
          Links to Users various Social Media accounts (Twitter, Tumblr, Etc) <p> STRETCH Goal</p>
        </GridItem>
        <GridItem bg='green.500' h='150px'>
          Email/Password/Login Method Editing will be here
        </GridItem> */}
    </>
  );
};

export default UserInfo;
