import {
  Button,
  Editable,
  EditableInput,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const UserInfo = ({
  fetchUserData,
  user,
  avatar,
  bio,
  city,
  state,
  userName,
  EditableControls,
  handleAvatarChange,
  handleBioChange,
  handleLocationChange,
  handleInputChange,
  handleUserNameChange,
}) => {
  const [editableUserName, setEditableUserName] = useState(userName);

  useEffect(() => {
    fetchUserData();
    // fetchWeather(user.city, user.state);
  }, [user]);


  return (
    <>
      <Grid
        className='AvatarGrid'
        // border='2px solid red'
      >
        <GridItem
          className='UserAvatar'
          bg='black'
          display='flex'
          alignItems='center'
          justifyContent='center'
          justifySelf='center'
          alignSelf='center'
          borderRadius='50%'
          border='15px solid #BDE3FF'
          w='300px'
          h='300px'
          position='relative'
          overflow='hidden'
          cursor='pointer'
          onClick={() => document.getElementById('avatarInput').click()}
        >
          <Image
            src={avatar}
            alt='Click to Edit Avatar'
            w='100%'
            h='100%'
            borderRadius='50%'
            // bg='#BDE3FF'
            display='flex'
            alignItems='center'
            justifyContent='center'
            objectFit='cover'
          />
          <input
            type='file'
            id='avatarInput'
            style={{ display: 'none' }}
            accept='.jpg, .jpeg, .png'
            onChange={handleAvatarChange}
          />
        </GridItem>
      </Grid>
      <Grid
        // border='2px solid orange'
        className='InnerGrids'
        templateColumns='repeat(1, 1fr)'
        w='85%'
        gap={4}
      >
        <GridItem
          className='UserNameChange'
          borderRadius='lg'
          bg='#BDE3FF'
          h='100px'
        >
          <Editable
            defaultValue={userName}
            onChange={(nextValue) => {
              setEditableUserName(nextValue);
            }}
            onSubmit={() => {
              handleUserNameChange(editableUserName);
            }}
            mt={2}
            minH='40px'
            isPreviewFocusable={false}
          >
            <Flex alignItems='center' gap='10'>
              <EditableControls bottom='5px' left='5px' w='100px' />
              <Text fontSize='xl' fontWeight='bold' ml='90px'>
                Edit Display Name
              </Text>
            </Flex>
            <p />
            <Heading as='h2' size='lg' textAlign='center'>
              {userName}
            </Heading>
            <Input
              as={EditableInput}
              border='1px solid black'
              bg='white'
              placeholder='Update your User Name'
              borderRadius='md'
              minH='40px'
              p={2}
            />
          </Editable>
        </GridItem>
        {/* Line break  */}
        <GridItem
          className='UserLocationCityStateChange'
          borderRadius='lg'
          bg='#BDE3FF'
          h='200px'
        >
            <Flex alignItems='center' gap='10'>
              <Text fontSize='xl' fontWeight='bold' ml='90px'>
                City and State
              </Text>
            </Flex>
            <p />
            <Heading as='h2' size='lg' textAlign='center'>
              {city && state ? `${city}, ${state}` : 'No Location Watched'}
            </Heading>
            <Flex
              direction='row'
              alignItems='center'
              justifyContent='center'
              mt={4}
              gap={6}
            >
              <Input
                name='city'
                placeholder='Enter City'
                onChange={handleInputChange}
                bg='white'
                border='1px solid black'
                borderRadius='md'
                mb={4}
                w='30%'
              />
              <Input
                name='state'
                placeholder='Enter State'
                onChange={handleInputChange}
                bg='white'
                border='1px solid black'
                borderRadius='md'
                mb={4}
                w='30%'
              />
            </Flex>
            <Flex justifyContent='center' mt={4}>
              <Button
                onClick={handleLocationChange}
                colorScheme='teal'
                size='md'
              >
                Get Weather
              </Button>
            </Flex>
        </GridItem>
         {/* Break Here  */}
        <GridItem
          className='UserBioChange'
          borderRadius='lg'
          bg='#BDE3FF'
          h='200px'
        >
          <Editable
            defaultValue={bio}
            onSubmit={handleBioChange}
            mt={2}
            minH='40px'
            isPreviewFocusable={false}
          >
            <Flex alignItems='center' gap='10'>
              <EditableControls bottom='5px' left='5px' w='100px' />
              <Text fontSize='xl' fontWeight='bold' ml='90px'>
                Edit User Bio
              </Text>
            </Flex>
            <p />
            <Heading as='h2' size='lg' textAlign='center'>
              {bio}
            </Heading>
            <Input
              as={EditableInput}
              border='1px solid black'
              bg='white'
              p={2}
              borderRadius='md'
              minH='40px'
              placeholder='Update your bio'
            />
          </Editable>
        </GridItem>
      </Grid>
    </>
  );
};

export default UserInfo;
