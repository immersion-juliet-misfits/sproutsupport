import {
  Box,
  Editable,
  EditableInput,
  Grid,
  GridItem,
  Input,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

const UserInfo = ({
  bio,
  EditableControls,
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
            h='90%' // This too
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
          {/* Change Placeholder */}
          Email/Password/Login
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
