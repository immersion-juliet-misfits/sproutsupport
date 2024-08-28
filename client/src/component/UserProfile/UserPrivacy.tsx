import axios from 'axios';
import { useState, useEffect } from 'react';
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
import UserControls from './UserControls';

const UserPrivacy = ({ user, fetchUserData }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [settings, setSettings] = useState({
    showWeather: user?.showWeather || false,
    showPlants: user?.showPlants || false,
    showMyMeetups: user?.showMyMeetups || false,
    showOtherMeetups: user?.showOtherMeetups || false,
    showForumPosts: user?.showForumPosts || false,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Grid
        // border='2px solid yellow'
        className='BottomGrids'
        templateColumns='repeat(1, 1fr)'
        w='85%'
        gap={4}
      >
        <GridItem p='10px' borderRadius='lg' bg='#BDE3FF'>
          <Heading textAlign='center' w='100%'>
            Public Profile Presentation
          </Heading>
          <Box
            //border='2px solid red'
            w='80%'
            mx='auto'
            p={10}
            fontSize='25px'
          >
            <VStack align='start' pl={4} spacing={6}>
              <HStack>
                <Switch
                  id='showDarkLight'
                  isChecked={colorMode === 'dark'}
                  onChange={toggleColorMode}
                />
                <label htmlFor='showDarkLight'>
                  Change Site Color Mode? Current: {colorMode}
                </label>
              </HStack>

              <HStack>
                <Switch
                  id='showPlants'
                  isChecked={settings.showPlants}
                  onChange={(e) =>
                    UserControls.handleToggle(
                      'showPlants',
                      e.target.checked,
                      setSettings
                    )
                  }
                />
                <label htmlFor='showPlants'>Display Your Plants?</label>
              </HStack>

              <HStack>
                <Switch
                  id='showMyMeetups'
                  isChecked={settings.showMyMeetups}
                  onChange={(e) =>
                    UserControls.handleToggle(
                      'showMyMeetups',
                      e.target.checked,
                      setSettings
                    )
                  }
                />
                <label htmlFor='showMyMeetups'>
                  Display Your Created Meetups?
                </label>
              </HStack>

              {/* Hide Below until I have access to other Users profiles & Meetups  */}
              {/* <HStack>
                <Switch
                  id='showOtherMeetups'
                  isChecked={settings.showOtherMeetups}
                  onChange={(e) =>
                    UserControls.handleToggle('showOtherMeetups', e.target.checked, setSettings)
                  }
                />
                <label htmlFor='showOtherMeetups'>
                  Display Your RSVP'd Meetups?
                </label>
              </HStack> */}

              <HStack>
                <Switch
                  id='showForumPosts'
                  isChecked={settings.showForumPosts}
                  onChange={(e) =>
                    UserControls.handleToggle(
                      'showForumPosts',
                      e.target.checked,
                      setSettings
                    )
                  }
                />
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
