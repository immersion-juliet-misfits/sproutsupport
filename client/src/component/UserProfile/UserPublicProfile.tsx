import {
  Box,
  Image,
  Text,
  VStack,
  Heading,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import NavBar from '../NavBar';

const UserPublicProfile = () => {
  let location = useLocation();
  let { avatar, bio, userName, weatherData, dailyForecastData, alertsData } =
    location.state || {
      bio: 'No bio available',
    };

  // console.log('Weather Data:', weatherData);
  // console.log('Current Conditions:', weatherData?.currentConditions);

  return (
    <Grid
      w='1100px'
      mx='auto'
      mt={10}
      p={5}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='md'
    >
      <Grid
        className='header-grid'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(5, 1fr)'
        h='100px'
        gap={4}
        mb={4}
      >
        <GridItem
          colSpan={1}
          bg='teal'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Box
            w='100px'
            h='100px'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            Site Logo
          </Box>
        </GridItem>
        <GridItem
          colSpan={3}
          bg='#c1e3c9'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Heading as='h1' size='2xl'>
            USER PROFILE
          </Heading>
        </GridItem>
        <GridItem
          colSpan={1}
          bg='teal'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Box
            w='100px'
            h='100px'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <NavBar />
          </Box>
        </GridItem>
      </Grid>
      <Grid
        className='content-grid'
        templateRows='1fr'
        templateColumns='1fr'
        bg='teal'
        alignItems='center'
        justifyContent='center'
        py={4}
      >
        <VStack spacing={4} align='center'>
          {/* <Button colorScheme='teal' variant='solid'>
            Follow(?)
          </Button> */}
          <Image
            borderRadius='full'
            boxSize='150px'
            src={avatar}
            alt={`${userName}'s avatar`}
          />
          <Heading as='h2' size='xl'>
            {userName}
          </Heading>
          <Text fontSize='md' color='white' textAlign='center'>
            {bio}
          </Text>

          {weatherData && (
            <Box p={5} shadow='md' borderWidth='1px' borderRadius='lg'>
              <Heading as='h2' size='lg' mb={4}>
                Current Weather
              </Heading>
              <Text fontSize='lg' fontWeight='bold'>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
              <Text>Temperature: {weatherData.temp ?? 'N/A'}°F</Text>
              <Text>Condition: {weatherData.conditions ?? 'N/A'}</Text>
              <Text>Wind Speed: {weatherData.windspeed ?? 'N/A'} mph</Text>
              <Text>Humidity: {weatherData.humidity ?? 'N/A'}%</Text>
              <Text>Feels Like: {weatherData.feelslike ?? 'N/A'}°F</Text>
              <Text>UV Index: {weatherData.uvindex ?? 'N/A'}</Text>
              <Text>Visibility: {weatherData.visibility ?? 'N/A'} km</Text>
            </Box>
          )}
          {dailyForecastData && dailyForecastData.length > 0 && (
            <Box p={5} shadow='md' borderWidth='1px' borderRadius='lg'>
              <Heading as='h2' size='lg' mb={4}>
                Daily Forecast
              </Heading>
              <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(3, 1fr)'
                gap={6}
              >
                {dailyForecastData.slice(1, 7).map((day, index) => {
                  const date = new Date(day.datetime);
                  date.setDate(date.getDate() + 1);
                  const dayOfWeek = date.toLocaleDateString('en-US', {
                    weekday: 'long',
                  });

                  return (
                    <Box
                      key={index}
                      mb={4}
                      p={3}
                      borderWidth='1px'
                      borderRadius='lg'
                      shadow='md'
                    >
                      <Text fontSize='lg' fontWeight='bold'>
                        {dayOfWeek} - {day.datetime}
                      </Text>
                      <Text>High: {day.tempmax ?? 'N/A'}°F</Text>
                      <Text>Low: {day.tempmin ?? 'N/A'}°F</Text>
                      <Text>Conditions: {day.conditions ?? 'N/A'}</Text>
                    </Box>
                  );
                })}
              </Grid>
            </Box>
          )}

          {alertsData && (
            <Box p={5} shadow='md' borderWidth='1px' borderRadius='lg'>
              <Heading as='h2' size='lg' mb={4}>
                Weather Alerts
              </Heading>
              {alertsData.length > 0 ? (
                alertsData.map((alert, index) => (
                  <Box key={index} mb={4}>
                    <Text>Alert: {alert.event}</Text>
                    <Text>Description: {alert.description}</Text>
                    <Text>Effective: {alert.effective}</Text>
                    <Text>Expires: {alert.expires}</Text>
                  </Box>
                ))
              ) : (
                <Text>There Are No Alerts At This Time</Text>
              )}
            </Box>
          )}
        </VStack>
      </Grid>
    </Grid>
  );
};

export default UserPublicProfile;
