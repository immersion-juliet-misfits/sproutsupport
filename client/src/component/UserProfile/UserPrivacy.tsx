import {
  Button,
  Checkbox,
  Grid,
  GridItem,
  Heading,
  VStack
} from '@chakra-ui/react';

const UserPrivacy = () => {
  return (
    <>
      <Grid
        className='BottomGrids'
        border='2px solid yellow'
        templateColumns='repeat(1, 1fr)'
        w='85%'
        gap={4}
      >
        <GridItem bg='green.500' h='150px'>
          Toggle to choose what's displayed on your public profile
          <VStack align='start' pl={4}>
            <Checkbox>My Plants</Checkbox>
            <Checkbox>My Created Meetups</Checkbox>
            <Checkbox>Meetups I will attend</Checkbox>
            <Checkbox>My Forum Posts</Checkbox>
          </VStack>
        </GridItem>
        <GridItem bg='green.500' h='150px'>
          Email/Password/Login Method Editing will be here
        </GridItem>
        <GridItem bg='green.500' h='150px'>
          Links to Users various Social Media accounts (Twitter, Tumblr, Etc)
        </GridItem>
        <GridItem bg='green.500' h='150px'>
          Blocking - Enter the name of the User you want to block.
        </GridItem>
        <GridItem bg='green.500' h='150px'>
          Accept messages from strangers? Display link to your Forum posts?
          Display your plants? Your Meetups?
        </GridItem>
      </Grid>


      <Grid
        // border='5px solid red'
        templateColumns='repeat(1, 1fr)'
        w='85%'
        gap={4}
      >
        <GridItem bg='green.500' h='100px'>
          <Button colorScheme='red'>
            Delete Account Placeholder
          </Button>
        </GridItem>
      </Grid>
    </>
  );
};

export default UserPrivacy;
