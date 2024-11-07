import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Text,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import UserControls from './UserControls';
import UserToggles from './UserToggles';

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
  const [userExistsError, setUserExistsError] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    fetchUserData();
    setEditableUserName('');
    setEditableBio('');
  }, [user.userName, user.bio]);

  const handleUserNameCheck = () => {
    if (editableUserName.trim() !== '') {
      UserControls.checkUserExists(editableUserName, (exists) => {
        if (exists) {
          setUserExistsError('This Username is not available');
          setIsPopoverOpen(true);

          setTimeout(() => {
            setIsPopoverOpen(false);
          }, 3000);
        } else {
          setUserExistsError('');
          UserControls.handleUserNameChange(editableUserName, setUser);
        }
      });
    }
  };

  return (
    <>
      <HStack className='u-top-hstack'></HStack>

      <HStack className='pub-box'>
        <VStack className='u-edit-vstack'>
          <GridItem
            id={
              user.avatar ===
              'https://ssupportbucket.s3.us-east-2.amazonaws.com/icon-sprout-support-notext.png'
                ? 'u-avatar-gi-default'
                : 'u-avatar-gi'
            }
            onClick={() => {
              document.getElementById('avatarInput').click();
            }}
            style={{ cursor: 'pointer' }}
          >
            <Image
              id='u-avatar-img'
              src={user.avatar}
              alt={'Avatar'}
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

            <EditIcon
              position='absolute'
              top='10px'
              right='10px'
              boxSize='24px'
              color='gray.500'
            />
          </GridItem>
        </VStack>

        <VStack
          id='g-vstack'
          className='u-vstack'
        >
          <VStack id='g-vstack'>
            <VStack className='u-vs-input'>
              <HStack
                id='g-hstack'
                className='u-hs-input'
                spacing={1}
              >
                <Input
                  id='u-g-input'
                  className='u-input'
                  name='username'
                  value={editableUserName}
                  placeholder='Enter new Username here'
                  onChange={(e) => setEditableUserName(e.target.value)}
                />

                <Popover
                  isOpen={isPopoverOpen}
                  onClose={() => setIsPopoverOpen(false)}
                  placement='top'
                  closeOnBlur={false}
                >
                  <PopoverTrigger>
                    <Box />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverCloseButton />
                    <PopoverBody>{userExistsError}</PopoverBody>
                  </PopoverContent>
                </Popover>

                <Button
                  id='g-button'
                  className='u-check-button'
                  onClick={handleUserNameCheck}
                  isDisabled={!editableUserName.trim()}
                >
                  <CheckIcon className='u-checkIcon' />
                </Button>
              </HStack>

              <Text className='u-text'>Current Display Name:</Text>
              <Heading
                id='g-heading'
                className='u-heading'
              >
                {user.userName}
              </Heading>
              <HStack
                id='g-hstack'
                className='u-hs-input'
                spacing={1}
              >
                <Input
                  id='u-g-input'
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

              <Text className='u-text'>Current User Bio</Text>
              <Text className='u-text'>{user.bio}</Text>
            </VStack>
          </VStack>
        </VStack>
      </HStack>

      <Box className='pub-box'>
        <UserToggles
          user={user}
          fetchUserData={fetchUserData}
        />
      </Box>

      <Box>
        <VStack className='u-hstack'>
          <Checkbox
            colorScheme='blue'
            isChecked={isEditMode}
            onChange={() => setIsEditMode(!isEditMode)}
          >
            Enable Account Deletion
          </Checkbox>

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
        </VStack>
      </Box>
    </>
  );
};

export default UserInfo;
