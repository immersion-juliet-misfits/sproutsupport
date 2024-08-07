import {
  // Box,
  // Editable,
  // EditableInput,
  Grid,
  GridItem,
  Heading,
  // Input,
} from '@chakra-ui/react';
// import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

const UserPrivacy = () => {
  return (
    <>
      <Grid>
        <GridItem bg='green.500' h='100px'>
          <Heading as='h1' size='2xl'>
            Privacy Placeholder
          </Heading>
        </GridItem>
      </Grid>
      <Grid
        // border='5px solid red'
        templateColumns='repeat(1, 1fr)'
        w='85%'
        gap={4}
      >
        <GridItem bg='green.500' h='100px'>
          {/* Change Placeholder */}
          Email/Password/Login Method Editing will be here
        </GridItem>
        <GridItem bg='green.500' h='100px'>
          Placeholder - Accept messages from strangers? Display link to your Forum posts? Display your plants? Your Meetups?
        </GridItem>
        <GridItem bg='green.500' h='200px'>
          Placeholder - Blocking?
        </GridItem>
      </Grid>
    </>
  );
};

export default UserPrivacy;
