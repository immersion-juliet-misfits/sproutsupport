import {
  Editable,
  EditableInput,
  Grid,
  GridItem,
  Image,
  Input,
} from '@chakra-ui/react';

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
            onSubmit={handleUserNameChange}
            mt={2}
            minH='40px'
            isPreviewFocusable={false}
          >
            <Input
              as={EditableInput}
              border='1px solid black'
              bg='white'
              placeholder='Update your User Name'
              borderRadius='md'
              minH='40px'
              p={2}
            />
            <EditableControls top='5px' left='5px' />
            Change Display name
            <p />
            {userName}
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
            <EditableControls top='5px' left='5px' />
            Change Location
            <p />
            {location_id}
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
            <Input
              as={EditableInput}
              border='1px solid black'
              bg='white'
              p={2}
              borderRadius='md'
              minH='40px'
              placeholder='Update your bio'
            />
            <EditableControls top='5px' left='5px' />
            User Bio
            <p />
            {bio}
          </Editable>
        </GridItem>
      </Grid>
    </>
  );
};

export default UserInfo;
