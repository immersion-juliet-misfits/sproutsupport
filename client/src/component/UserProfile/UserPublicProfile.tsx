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
  const [plants, setPlants] = useState([]);
  const [myMeetups, setMyMeetups] = useState([]);
  const [posts, setPosts] = useState([]);

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
          </VStack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserPublicProfile;
