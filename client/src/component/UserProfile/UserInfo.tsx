import {
  Button,
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
  user,
  avatar,
  bio,
  city,
  state,
  userName,
  fetchUserData,
  handleAvatarChange,
  handleBioChange,
  handleLocationChange,
  handleInputChange,
  handleUserNameChange,
}) => {
  const [editableUserName, setEditableUserName] = useState('');
  const [editableCity, setEditableCity] = useState('');
  const [editableState, setEditableState] = useState('');
  const [editableBio, setEditableBio] = useState('');

  useEffect(() => {
    fetchUserData();
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
        {/* ************************** */}
        <GridItem
          className='UserNameChange'
          borderRadius='lg'
          bg='#BDE3FF'
          h='200px'
        >
          <Flex alignItems='center' gap='10'>
            <Text fontSize='xl' fontWeight='bold' ml='90px'>
              Display Name
            </Text>
          </Flex>
          <Heading as='h2' size='lg' textAlign='center'>
            {userName}
          </Heading>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserNameChange(editableUserName);
              setEditableUserName('');
            }}
          >
            <Flex
              direction='row'
              alignItems='center'
              justifyContent='center'
              mt={4}
              gap={6}
            >
              <Input
                name='username'
                value={editableUserName}
                placeholder='Enter new User Name here'
                onChange={(e) => setEditableUserName(e.target.value)}
                bg='white'
                border='1px solid black'
                borderRadius='md'
                mb={4}
                w='50%'
              />
            </Flex>
            <Flex justifyContent='center' mt={4}>
              <Button type='submit' colorScheme='teal' size='md'>
                Save Display Name
              </Button>
            </Flex>
          </form>
        </GridItem>
        {/* ************************** */}
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLocationChange();
            }}
          >
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
              <Button type='submit' colorScheme='teal' size='md'>
                Get Weather
              </Button>
            </Flex>
          </form>
        </GridItem>
        {/* ************************** */}
        <GridItem
          className='UserBioChange'
          borderRadius='lg'
          bg='#BDE3FF'
          h='200px'
        >
          <Flex alignItems='center' gap='10'>
            <Text fontSize='xl' fontWeight='bold' ml='90px'>
              Edit User Bio
            </Text>
          </Flex>
          <Heading as='h2' size='lg' textAlign='center'>
            {bio}
          </Heading>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleBioChange(editableBio);
              setEditableBio('');
            }}
          >
            <Flex
              direction='row'
              alignItems='center'
              justifyContent='center'
              mt={4}
              gap={6}
            >
              <Input
                name='bio'
                value={editableBio}
                placeholder='Enter new Bio'
                onChange={(e) => setEditableBio(e.target.value)}
                bg='white'
                border='1px solid black'
                borderRadius='md'
                mb={4}
                w='50%'
              />
            </Flex>
            <Flex justifyContent='center' mt={4}>
              <Button type='submit' colorScheme='teal' size='md'>
                Save Bio
              </Button>
            </Flex>
          </form>
        </GridItem>
        {/* ************************** */}
      </Grid>
    </>
  );
};

export default UserInfo;
