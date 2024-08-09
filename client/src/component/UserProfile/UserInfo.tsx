import {
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
import { useState } from 'react';

const UserInfo = ({
  avatar,
  bio,
  location_id,
  userName,
  EditableControls,
  handleAvatarChange,
  handleBioChange,
  handleLocationChange,
  handleUserNameChange,
}) => {
  const [editableUserName, setEditableUserName] = useState(userName);

  return (
    <>
      <Grid>
        <GridItem
          bg='yellow.500'
          display='flex'
          alignItems='center'
          justifyContent='center'
          justifySelf='center'
          alignSelf='center'
          borderRadius='50%'
          w='250px'
          h='250px'
          position='relative'
          overflow='hidden'
          cursor='pointer'
          onClick={() => document.getElementById('avatarInput').click()}
        >
          <Image
            src={avatar}
            alt='Click to Edit Avatar'
            // w='90%' // Temp 90% so I can see
            // h='90%' // This too
            w='100%'
            h='100%'
            borderRadius='50%'
            bg='green.500'
            display='flex'
            alignItems='center'
            justifyContent='center'
          />
          <input
            type='file'
            id='avatarInput'
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
        </GridItem>
      </Grid>
      <Grid
        // border='5px solid red'
        templateColumns='repeat(1, 1fr)'
        w='85%'
        gap={4}
      >
        <GridItem bg='green.500' h='100px'>
          <Editable
            defaultValue={userName}
            onChange={(nextValue) => { setEditableUserName(nextValue); } }
            onSubmit={() => {handleUserNameChange(editableUserName); } }
            mt={2}
            minH='40px'
            isPreviewFocusable={false}
          >
            <Flex alignItems='center' gap='10'>
              <EditableControls bottom='5px' left='5px' w='100px' />
              <Text fontSize='xl' fontWeight='bold' ml='90px'>
                Change Display name
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
        <GridItem bg='green.500' h='100px'>
          <Editable
            defaultValue={String(location_id)}
            onSubmit={handleLocationChange}
            mt={2}
            minH='40px'
            isPreviewFocusable={false}
          >
            <Flex alignItems='center' gap='10'>
              <EditableControls bottom='5px' left='5px' w='100px' />
              <Text fontSize='xl' fontWeight='bold' ml='90px'>
                Change Location
              </Text>
            </Flex>
            <p />
            <Heading as='h2' size='lg' textAlign='center'>
              {location_id}
            </Heading>
            <Input
              as={EditableInput}
              type='number'
              border='1px solid black'
              bg='white'
              placeholder='Update your Location'
              borderRadius='md'
              minH='40px'
              p={2}
            />
          </Editable>
        </GridItem>
        <GridItem bg='green.500' h='200px'>
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
                User Bio
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
