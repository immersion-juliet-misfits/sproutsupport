import {
  Button,
  Grid,
  GridItem,
  Switch,
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
        <GridItem bg='green.500' p='10px'>
          Toggle to choose what's displayed on your public profile
          <VStack align='start' pl={4}>
            <Switch>Display Site In Dark Mode?</Switch>
            <Switch>Display Your Plants?</Switch>
            <Switch>Display Your Created Meetups?</Switch>
            <Switch>Display Your RSVP'd Meetups?</Switch>
            <Switch>Display Your Forum Posts?</Switch>
            {/* <Switch> Accept messages from strangers?</Switch> */}
          </VStack>
        </GridItem>
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
        <GridItem bg='green.500' h='100px'>
          <Button colorScheme='red'>
            Delete Account
          </Button>
        </GridItem>
      </Grid>
    </>
  );
};

export default UserPrivacy;
