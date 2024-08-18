import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Image,
  Text,
  VStack,
  Heading,
  Grid,
} from '@chakra-ui/react';
import TopBar from './TopBar';

interface User {
  id: number;
  google_id: string;
  userName: string;
  email: string;
  avatar: string;
  bio: string;
  city: string;
  state: string;
}

const UserPublicProfile = ({ fetchUserData, user }) => {
  const [apiError, setApiError] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [dailyForecastData, setDailyForecastData] = useState(null);
  const [alertsData, setAlertsData] = useState(null);
  const [plants, setPlants] = useState([]);
  const [myMeetups, setMyMeetups] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchWeather = (city, state) => {
    axios
      .get(`/user/weatherDataByCity?city=${city}&state=${state}`)
      .then((response) => {
        // console.log('Retrieved weather data:', response.data);
        const data = response.data;

        setWeatherData(data.currentConditions);
        setDailyForecastData(data.days);
        setAlertsData(data.alerts || []);
        setApiError(false);
      })
      .catch((err) => {
        setApiError(true);
        // console.error('Error fetching weather data for city and state:', err);
      });
  };

  const getPlants = () => {
    axios
      .get(`/plants/all/${user.id}`)
      .then(({ data }) => {
        // console.log('Plant Data: ', data);
        setPlants(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getMeetups = (): void => {
    axios
      .get(`/meetup/all/${user.id}`)
      .then(({ data }) => {
        // console.log('Meetups data:', data);
        setMyMeetups(data.yours);
      })
      .catch((err) => {
        console.error('Error fetching meetups:', err);
      });
  };

  const getPosts = () => {
    axios
      .get('/post/post')
      .then(({ data }) => {
        // console.log('Forum data', data);
        setPosts(data);
      })
      .catch((err) => {
        console.error('Failed to GET post: ', err);
      });
  };

  useEffect(() => {
    fetchUserData();
    if (user?.showWeather && user.city && user.state) {
      fetchWeather(user.city, user.state);
    }
    if (user?.showPlants) {
      getPlants();
    }
    if (user?.showMyMeetups) {
      getMeetups();
    }
    if (user?.showForumPosts) {
      getPosts();
    }
  }, []);

  return (
    <Grid className='publicBodyGrid' w='1100px' mx='auto'>
      <TopBar />
      <Grid
        className='bodyGrid'
        // border='2px solid red'
        bg='#D3FFEB'
        borderBottom='0'
        w='1100px'
        mx='auto'
        borderRadius='lg'
        overflow='hidden'
        boxShadow='md'
        templateRows='1fr'
        templateColumns='1fr'
        display='flex'
        flexDirection='column'
        alignItems='center'
        // justifyContent='flex-end'
      >
        <Grid
          w='1100px'
          mx='auto'
          mt='0'
          borderRadius='lg'
          // border='15px solid red'
          border='15px solid #D3FFEB'
          bg='#5AB78D'
          gap={10}
          overflow='hidden'
          boxShadow='md'
          templateRows='1fr'
          templateColumns='1fr'
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          py={4}
        >
          <VStack spacing={4} align='center'>
            {/* <Button colorScheme='teal' variant='solid'>
            Follow(?)
          </Button> */}
            <Image
              src={user.avatar}
              alt={`${user.userName}'s avatar`}
              w='300px'
              h='300px'
              objectFit='cover'
              borderRadius='50%'
              border='15px solid #D3FFEB'
            />
            <Heading as='h2' size='xl'>
              {user.userName}
            </Heading>
            <Text fontSize='md' color='white' textAlign='center'>
              {user.bio}
            </Text>

            {/* ***************************************  */}

            {user?.showPlants && (
              <Box className='plantBox'>
                <Heading textAlign='center' mb={4}>
                  My Newest Plants
                </Heading>
                {plants.length > 0 ? (
                  <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                    {plants.slice(-6).map((plant) => (
                      <Card key={plant.id} bg='green.200'>
                        <CardHeader textAlign={'center'}>
                          <Heading size='md'>{plant.nickname}</Heading>
                          {plant.nickname !== plant.commonName && (
                            <Text>
                              <strong>{plant.commonName}</strong>
                            </Text>
                          )}
                        </CardHeader>
                        <CardBody textAlign={'center'}>
                          {plant.imageUrl && (
                            <Center>
                              <img
                                width={250}
                                height={250}
                                src={plant.imageUrl}
                                alt={`${plant.nickname}`}
                              />
                            </Center>
                          )}
                          <Text>
                            <em>{plant.description}</em>
                          </Text>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>
                ) : (
                  <Text>No Plants Available</Text>
                )}
              </Box>
            )}

            {/* ***************************************  */}

            {user?.showMyMeetups && (
              <Box className='myMeetupsBox'>
                <Heading textAlign='center' mb={4}>
                  My Hosted Meetups
                </Heading>
                {myMeetups.length > 0 ? (
                  <Grid
                    templateColumns={`repeat(${Math.min(
                      myMeetups.length,
                      3
                    )}, 1fr)`}
                    gap={6}
                    justifyContent='center'
                    alignItems='center'
                  >
                    {myMeetups.slice(-6).map((meetup) => (
                      <Card key={meetup.id} bg='green.200'>
                        <CardHeader textAlign={'center'}>
                          <Heading size='md'>{meetup.eventName}</Heading>
                        </CardHeader>
                        <CardBody textAlign={'center'}>
                          {meetup.imageUrl && (
                            <Center>
                              <Image
                                width={250}
                                height={250}
                                src={meetup.imageUrl}
                                alt={meetup.eventName}
                                objectFit='cover'
                              />
                            </Center>
                          )}
                          <Text>{meetup.description}</Text>
                          <Text>
                            {meetup.location
                              .replace('State:', '-')
                              .replace('City:', '-')
                              .trim()}
                          </Text>
                          <Text>Date & Time: {meetup.time_date}</Text>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>
                ) : (
                  <Text>No Meetups Available</Text>
                )}
              </Box>
            )}
            {/* ***************************************  */}
            {/* Can't Implement without access to other Users data  */}
            {/*
            {user?.showOtherMeetups && (
              <Box className='rsvpMeetupsBox'>
                <Heading textAlign='center' mb={4}>
                  Meetups I'm Attending
                </Heading>
              </Box>
            )}
            */}

            {/* ***************************************  */}

            {user?.showForumPosts && (
              <Box className='forumBox'>
                <Heading textAlign='center' mb={4}>
                  My Recent Posts
                </Heading>
                {posts.length > 0 ? (
                  <Grid
                    templateColumns={`repeat(${Math.min(
                      posts.length,
                      3
                    )}, 1fr)`}
                    gap={6}
                    justifyContent='center'
                    alignItems='center'
                  >
                    {posts.slice(-6).map((post) => (
                      <Card key={post.id} bg='green.200' h='400px'>
                        <CardHeader textAlign={'center'}>
                          <Heading size='md'>{`Post #${post.id}`}</Heading>
                        </CardHeader>
                        <CardBody textAlign={'center'}>
                          {post.imageUrl && (
                            <Center>
                              <Image
                                width={250}
                                height={250}
                                src={post.imageUrl}
                                alt={`Post ${post.id}`}
                                objectFit='contain'
                              />
                            </Center>
                          )}
                          <Text>{post.message}</Text>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>
                ) : (
                  <Text>No Forum Posts Available</Text>
                )}
              </Box>
            )}

            {/* ***************************************  */}

            {user?.showWeather && (
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
                          Temperature:{' '}
                          {(weatherData.temp * 9) / 5 + 32 ?? 'N/A'}°F
                        </Text>
                        <Text>
                          Condition: {weatherData.conditions ?? 'N/A'}
                        </Text>
                        <Text>
                          Wind Speed: {weatherData.windspeed ?? 'N/A'} mph
                        </Text>
                        <Text>Humidity: {weatherData.humidity ?? 'N/A'}%</Text>
                        <Text>
                          Feels Like: {weatherData.feelslike ?? 'N/A'}°F
                        </Text>
                        <Text>UV Index: {weatherData.uvindex ?? 'N/A'}</Text>
                        <Text>
                          Visibility: {weatherData.visibility ?? 'N/A'} km
                        </Text>
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
                                  {Math.floor((day.tempmax * 9) / 5 + 32) ??
                                    'N/A'}
                                  °F
                                </Text>
                                <Text>
                                  Low:{' '}
                                  {Math.floor((day.tempmin * 9) / 5 + 32) ??
                                    'N/A'}
                                  °F
                                </Text>
                                <Text>
                                  Conditions: {day.conditions ?? 'N/A'}
                                </Text>
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
                            <Text>
                              Ends: {new Date(alert.ends).toLocaleString()}
                            </Text>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </>
                )}
              </Box>
            )}
            {/* ***************************************  */}
          </VStack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserPublicProfile;
