// import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import UserControls from './UserControls';

const UserInfo = ({
  user,
  avatar,
  bio,
  userName,
  fetchUserData,
  handleAvatarChange,
  handleBioChange,
  handleUserNameChange,
}) => {
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
      <Grid
        className='AvatarGrid'
        // border='2px solid red'
      >
        <GridItem
          className='UserAvatar'
          bg='black'
          display='flex'
          alignItems='center'
          justifyContent='center'
          justifySelf='center'
          alignSelf='center'
          borderRadius='50%'
          border='15px solid #BDE3FF'
          w='300px'
          h='300px'
          position='relative'
          overflow='hidden'
          cursor='pointer'
          onClick={() => document.getElementById('avatarInput').click()}
        >
          <Image
            src={avatar}
            alt='Click to Edit Avatar'
            w='100%'
            h='100%'
            borderRadius='50%'
            display='flex'
            alignItems='center'
            justifyContent='center'
            objectFit='cover'
          />
          <input
            type='file'
            id='avatarInput'
            style={{ display: 'none' }}
            accept='.jpg, .jpeg, .png'
            onChange={handleAvatarChange}
          />
        </GridItem>
      </Grid>
      <Grid
        // border='2px solid orange'
        className='InnerGrids'
        templateColumns='repeat(1, 1fr)'
        w='85%'
        gap={4}
      >
        {/* Edit Username ************************** */}
        <GridItem
          className='UserNameChange'
          borderRadius='lg'
          bg='#BDE3FF'
          h='200px'
        >
          <Flex alignItems='center' gap='10'>
            <Text fontSize='xl' fontWeight='bold' ml='90px'>
              Edit Display Name
            </Text>
          </Flex>
          <Heading as='h2' size='lg' textAlign='center'>
            {userName}
          </Heading>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserNameChange(editableUserName);
              setEditableUserName('');
            }}
          >
            <Flex
              direction='row'
              alignItems='center'
              justifyContent='center'
              mt={4}
              gap={6}
            >
              <Input
                name='username'
                value={editableUserName}
                placeholder='Enter new User Name here'
                onChange={(e) => setEditableUserName(e.target.value)}
                bg='white'
                border='1px solid black'
                borderRadius='md'
                mb={4}
                w='50%'
              />
            </Flex>
            <Flex justifyContent='center' mt={4}>
              <Button type='submit' colorScheme='teal' size='md'>
                Save Display Name
              </Button>
            </Flex>
          </form>
        </GridItem>
        {/* Edit Bio ************************** */}
        <GridItem
          className='UserBioChange'
          borderRadius='lg'
          bg='#BDE3FF'
          h='200px'
        >
          <Flex alignItems='center' gap='10'>
            <Text fontSize='xl' fontWeight='bold' ml='90px'>
              Edit User Bio
            </Text>
          </Flex>
          <Heading as='h2' size='lg' textAlign='center'>
            {bio}
          </Heading>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleBioChange(editableBio);
              setEditableBio('');
            }}
          >
            <Flex
              direction='row'
              alignItems='center'
              justifyContent='center'
              mt={4}
              gap={6}
            >
              <Input
                name='bio'
                value={editableBio}
                placeholder='Enter new Bio'
                onChange={(e) => setEditableBio(e.target.value)}
                bg='white'
                border='1px solid black'
                borderRadius='md'
                mb={4}
                w='50%'
              />
            </Flex>
            <Flex justifyContent='center' mt={4}>
              <Button type='submit' colorScheme='teal' size='md'>
                Save Bio
              </Button>
            </Flex>
          </form>
        </GridItem>
        {/* Edit Location ************************** */}
        <GridItem
          className='UserLocationCityStateChange'
          borderRadius='lg'
          bg='#BDE3FF'
          h='200px'
        >
          <Flex alignItems='center' gap='10'>
            <Text fontSize='xl' fontWeight='bold' ml='90px'>
              Edit City and State for Weather Watch
            </Text>
          </Flex>
          <p />
          <Heading as='h2' size='lg' textAlign='center'>
             {user.city && user.state ? `${user.city}, ${user.state}` : 'No Location Watched'}
          </Heading>
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
            <Flex
              direction='row'
              alignItems='center'
              justifyContent='center'
              mt={4}
              gap={6}
            >
              <Input
                name='city'
                placeholder='Enter City'
                onChange={(e) => setLocation((prevLocation) => ({
                  ...prevLocation,
                  city: e.target.value,
                }))}
                bg='white'
                border='1px solid black'
                borderRadius='md'
                mb={4}
                w='30%'
              />
              <Input
                name='state'
                placeholder='Enter State'
                onChange={(e) => setLocation((prevLocation) => ({
                  ...prevLocation,
                  state: e.target.value,
                }))}
                bg='white'
                border='1px solid black'
                borderRadius='md'
                mb={4}
                w='30%'
              />
            </Flex>
            <Flex justifyContent='center' mt={4}>
              <Button type='submit' colorScheme='teal' size='md'>
                Get Weather
              </Button>
            </Flex>
          </form>
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
                            Low:{' '}
                            {Math.floor((day.tempmin * 9) / 5 + 32) ?? 'N/A'}
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
      </Grid>
    </>
  );
};

export default UserInfo;
