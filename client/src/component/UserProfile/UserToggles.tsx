import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Switch,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import UserControls from './UserControls';

const UserToggles = ({ user, fetchUserData }) => {
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
        className='BottomGrids'
        templateColumns='repeat(1, 1fr)'
        w='85%'
        gap={4}
      >
        <GridItem
          p='10px'
          borderRadius='lg'
        >

          <Box
            w='80%'
            mx='auto'
            p={10}
            fontSize='25px'
          >
            <VStack
              align='start'
              pl={4}
              spacing={6}
            >
              <HStack>
                <Switch
                  id='showDarkLight'
                  isChecked={colorMode === 'dark'}
                  onChange={toggleColorMode}
                />
                <label htmlFor='showDarkLight'>
                  Change Theme? Current: {colorMode}
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
      </Grid>
    </>
  );
};

export default UserToggles;
