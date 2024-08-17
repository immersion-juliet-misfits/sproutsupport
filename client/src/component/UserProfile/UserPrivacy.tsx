import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Switch,
  useColorMode,
  VStack,
} from '@chakra-ui/react';

const UserPrivacy = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Grid
        className='BottomGrids'
        // border='2px solid yellow'
        templateColumns='repeat(1, 1fr)'
        w='85%'
        gap={4}
      >
        <GridItem p='10px' borderRadius='lg' bg='#BDE3FF'>
          {/* This appears to change the entire site whether logged in or out?  Will tying it to the option in the User table fix this? */}
          <Heading textAlign='center' w='100%'>
            Choose what's displayed on your Profile
          </Heading>
          <Box
            w='80%'
            mx='auto'
            p={10}
            fontSize='25px'
            //border='2px solid red'
          >
            <VStack align='start' pl={4} spacing={6}>
              <HStack>
                <Switch
                  id='showDarkLight'
                  isChecked={colorMode === 'dark'}
                  onChange={toggleColorMode}
                />
                <label htmlFor='showDarkLight'>
                  Change Site Display? Current Mode: {colorMode}
                </label>
              </HStack>

              <HStack>
                <Switch id='showPlants' />
                <label htmlFor='showPlants'>Display Your Plants?</label>
              </HStack>

              <HStack>
                <Switch id='showMyMeetUps' />
                <label htmlFor='showMyMeetUps'>
                  Display Your Created Meetups?
                </label>
              </HStack>

              <HStack>
                <Switch id='showOtherMeetups' />
                <label htmlFor='showOtherMeetups'>
                  Display Your RSVP'd Meetups?
                </label>
              </HStack>

              <HStack>
                <Switch id='showForumPosts' />
                <label htmlFor='showForumPosts'>
                  Display Your Forum Posts?
                </label>
              </HStack>
            </VStack>
          </Box>
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
        <GridItem p='10px' borderRadius='lg' bg='#BDE3FF'>
          <Button colorScheme='red'>Delete Account</Button>
        </GridItem>
      </Grid>
    </>
  );
};

export default UserPrivacy;
