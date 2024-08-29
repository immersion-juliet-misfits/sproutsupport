// import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import UserControls, { useGlobalState } from './UserControls';

const UserInfo = ({
  user,
  fetchUserData,
  avatar,
  handleAvatarChange,
  userName,
  handleUserNameChange,
  bio,
  handleBioChange,
}) => {
  // Global State conversion WIP
  // const { state } = useGlobalState();
  // ******
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableUserName, setEditableUserName] = useState('');
  const [editableBio, setEditableBio] = useState('');
  const [apiError, setApiError] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [dailyForecastData, setDailyForecastData] = useState(null);
  const [alertsData, setAlertsData] = useState(null);
  const [location, setLocation] = useState({
    city: user.city || '',
    state: user.state || '',
  });
  // ******
  // Display Toggle states
  // const { colorMode, toggleColorMode } = useColorMode();
  // const [settings, setSettings] = useState({
  //   showWeather: user?.showWeather || false,
  //   showPlants: user?.showPlants || false,
  //   showMyMeetups: user?.showMyMeetups || false,
  //   showOtherMeetups: user?.showOtherMeetups || false,
  //   showForumPosts: user?.showForumPosts || false,
  // });

  // ******
  useEffect(() => {
    fetchUserData();

    if (
      user.city !== 'undefined' &&
      user.state !== 'undefined' &&
      user.city !== '' &&
      user.state !== ''
    ) {
      UserControls.fetchWeather(
        user.city,
        user.state,
        setWeatherData,
        setDailyForecastData,
        setAlertsData
      );
    }
  }, [user.city, user.state, location]);

  return (
    <>
      <Grid id='grid-avatar'>
        <GridItem
          id='gridItem-avatar'
          onClick={() => document.getElementById('avatarInput').click()}
        >
          <Image id='img-avatar' src={avatar} alt='Click to Edit Avatar' />
          <input
            type='file'
            id='avatarInput'
            style={{ display: 'none' }}
            accept='.jpg, .jpeg, .png'
            onChange={handleAvatarChange}
          />
        </GridItem>
      </Grid>

      <HStack>
        <Button id='g-button' onClick={() => setIsEditMode(!isEditMode)}>
          {isEditMode ? 'Cancel Edits' : 'Edit Profile'}
        </Button>

        {isEditMode && <Button id='g-button'>Save Edits</Button>}
      </HStack>

      {/* Edit Username ************************** */}
      <GridItem
        // className='UserNameChange'
        id='gridItem-changes'
      >
        <VStack align='center' visibility={isEditMode ? 'visible' : 'hidden'}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserNameChange(editableUserName);
              setEditableUserName('');
            }}
          >
            <Input
              id='g-input'
              name='username'
              value={editableUserName}
              placeholder='Enter new User Name here'
              onChange={(e) => setEditableUserName(e.target.value)}
            />
          </form>
        </VStack>

        <VStack align='center'>
          <Text fontSize='xl' fontWeight='bold'>
            Current Display Name:
          </Text>
          <Heading as='h2' size='lg' textAlign='center'>
            {userName}
          </Heading>
          {/* <Button type='submit' colorScheme='teal' size='md'>
                Save Display Name
              </Button> */}
        </VStack>
      </GridItem>

      {/* Edit Bio ************************** */}
      <GridItem
        // className='UserBioChange'
        id='gridItem-changes'
      >
        <VStack
          // border='1px solid blue'
          align='center'
          visibility={isEditMode ? 'visible' : 'hidden'}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleBioChange(editableBio);
              setEditableBio('');
            }}
          >
            <Input
              id='g-input'
              name='bio'
              value={editableBio}
              placeholder='Enter new Bio'
              onChange={(e) => setEditableBio(e.target.value)}
            />
          </form>
        </VStack>

        <VStack
          // border='1px solid red'
          align='center'
        >
          <Text fontSize='xl' fontWeight='bold'>
            Current User Bio
          </Text>

          <Heading as='h2' size='lg' textAlign='center'>
            {bio}
          </Heading>

          {/* <Button type='submit' colorScheme='teal' size='md'>
                Save Bio
              </Button> */}
        </VStack>
      </GridItem>

      {/* Edit Location ************************** */}
      <GridItem
        // className='UserLocationCityStateChange'
        id='gridItem-changes'
      >
        <VStack align='center' visibility={isEditMode ? 'visible' : 'hidden'}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              UserControls.fetchWeather(
                location.city,
                location.state,
                setWeatherData,
                setDailyForecastData,
                setAlertsData
              );
            }}
          >
            <HStack spacing={1}>
              <Input
                id='g-input'
                className='u-input'
                name='city'
                placeholder='Enter City'
                onChange={(e) =>
                  setLocation((prevLocation) => ({
                    ...prevLocation,
                    city: e.target.value,
                  }))
                }
              />
              <Input
                id='g-input'
                name='state'
                placeholder='Enter State'
                onChange={(e) =>
                  setLocation((prevLocation) => ({
                    ...prevLocation,
                    state: e.target.value,
                  }))
                }
              />
            </HStack>
          </form>
        </VStack>

        <VStack
          // border='1px solid red'
          align='center'
        >
          <Text fontSize='xl' fontWeight='bold'>
            Current City and State for Weather Watch
          </Text>

          <p />
          <Heading as='h2' size='lg' textAlign='center'>
            {user.city && user.state
              ? `${user.city}, ${user.state}`
              : 'No Location Watched'}
          </Heading>

          {/* <Button type='submit' colorScheme='teal' size='md'>
                Get Weather
              </Button> */}
        </VStack>
      </GridItem>
      {/* ************************** */}

      <Box className='weatherBox'>
        <Heading textAlign='center' mb={4}>
          My Weather
        </Heading>
        {apiError ? (
          <Text>No Weather Update Currently Available</Text>
        ) : (
          <>
            {weatherData && (
              <Box
                p={5}
                shadow='md'
                borderWidth='1px'
                borderRadius='lg'
                mb={4}
                textAlign='center'
                maxWidth='85%'
                mx='auto'
              >
                <Heading as='h2' size='lg' mb={4}>
                  Current Weather for {user.city}, {user.state}
                </Heading>
                <Text fontSize='lg' fontWeight='bold'>
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
                <Text>
                  Temperature: {(weatherData.temp * 9) / 5 + 32 ?? 'N/A'}°F
                </Text>
                <Text>Condition: {weatherData.conditions ?? 'N/A'}</Text>
                <Text>Wind Speed: {weatherData.windspeed ?? 'N/A'} mph</Text>
                <Text>Humidity: {weatherData.humidity ?? 'N/A'}%</Text>
                <Text>Feels Like: {weatherData.feelslike ?? 'N/A'}°F</Text>
                <Text>UV Index: {weatherData.uvindex ?? 'N/A'}</Text>
                <Text>Visibility: {weatherData.visibility ?? 'N/A'} km</Text>
              </Box>
            )}

            {dailyForecastData && dailyForecastData.length > 0 && (
              <Box p={5} mb={4}>
                <Heading as='h2' size='lg' mb={4} textAlign='center'>
                  Daily Forecast
                </Heading>
                <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                  {dailyForecastData.slice(1, 7).map((day, index) => {
                    const date = new Date(day.datetime);
                    date.setDate(date.getDate() + 1);
                    const dayOfWeek = date.toLocaleDateString('en-US', {
                      weekday: 'long',
                    });

                    return (
                      <Box
                        key={index}
                        p={3}
                        shadow='md'
                        borderWidth='1px'
                        borderRadius='lg'
                        textAlign='center'
                      >
                        <Text fontSize='lg' fontWeight='bold'>
                          {dayOfWeek} - {day.datetime}
                        </Text>
                        <Text>
                          High:{' '}
                          {Math.floor((day.tempmax * 9) / 5 + 32) ?? 'N/A'}
                          °F
                        </Text>
                        <Text>
                          Low: {Math.floor((day.tempmin * 9) / 5 + 32) ?? 'N/A'}
                          °F
                        </Text>
                        <Text>Conditions: {day.conditions ?? 'N/A'}</Text>
                      </Box>
                    );
                  })}
                </Grid>
              </Box>
            )}

            {alertsData && alertsData.length > 0 && (
              <Box
                p={5}
                shadow='md'
                borderWidth='1px'
                borderRadius='lg'
                mb={4}
                textAlign='center'
                maxWidth='85%' // Limit the width for alerts as well
                mx='auto' // Center the box
              >
                <Heading as='h2' size='lg' mb={4} textAlign='center'>
                  Weather Alerts
                </Heading>
                {alertsData.map((alert, index) => (
                  <Box key={index} mb={4}>
                    <Text fontWeight='bold'>Alert: {alert.event}</Text>
                    <Text>{alert.headline}</Text>
                    <Text whiteSpace='pre-wrap'>
                      {alert.description.replace(
                        /(WHERE|WHEN|IMPACTS)/g,
                        '\n$1'
                      )}
                    </Text>
                    <Text>Ends: {new Date(alert.ends).toLocaleString()}</Text>
                  </Box>
                ))}
              </Box>
            )}
          </>
        )}
      </Box>

      {/* ************************** */}
    </>
  );
};

export default UserInfo;
