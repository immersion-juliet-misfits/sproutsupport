import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Grid,
  GridItem,
} from '@chakra-ui/react';

const UserInfo = ({
  bio,
  userName,
  handleAvatarChange,
  handleBioChange,
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
          <Box
            w='90%' // Temp 90% so I can see
            h='90%'
            bg='green.500'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            Click to Edit Avatar
          </Box>
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
        // templateRows='repeat(3, 1fr)'
        templateColumns='repeat(1, 1fr)'
        w='85%'
        gap={4}
      >
        <GridItem bg='green.500' h='100px'>
          Change Display name
          <p />
          {userName}
          <Editable
            defaultValue={userName}
            onSubmit={handleUserNameChange}
            mt={2}
            // startWithEditView={false}
            minH='40px'
          >
            <EditablePreview
              border='1px solid black'
              bg='white'
              p={2}
              borderRadius='md'
              minH='40px'
            >
              {userName || 'Click to edit name'}
            </EditablePreview>
            <EditableInput
              border='1px solid black'
              bg='white'
              p={2}
              borderRadius='md'
              minH='40px'
              placeholder='Enter your name'
            />
          </Editable>
        </GridItem>
        <GridItem bg='green.500' h='100px'>
          {/* Change Placeholder */}
          Email/Password/Login
        </GridItem>
        <GridItem bg='green.500' h='200px'>
          User Bio
          <p />
          {bio}
          <Editable
            defaultValue={bio}
            onSubmit={handleBioChange}
            mt={2}
            // startWithEditView={false}
            minH='40px'
          >
            <EditablePreview
              border='1px solid black'
              bg='white'
              p={2}
              borderRadius='md'
              minH='40px'
            >
              {bio || 'Click to edit bio'}
            </EditablePreview>
            <EditableInput
              border='1px solid black'
              bg='white'
              p={2}
              borderRadius='md'
              minH='40px'
              placeholder='Enter your bio'
            />
          </Editable>
        </GridItem>
      </Grid>
    </>
  );
};

export default UserInfo;
