import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
  VStack,
  Heading,
} from '@chakra-ui/react';
import TopBar from './TopBar';
import UserControls from './UserControls';

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
  const [posts, setPosts] = useState([]);
  const [myMeetups, setMyMeetups] = useState([]);
  // States for when another User views your profile
  // const { userId } = useParams();
  // const [user, setUser] = useState(null);

  // Prevents infinite Loop from 'user' being a dependency
  const isFirstRender = useRef(true);

  // Fetches user data only on initial mount
  useEffect(() => {
    fetchUserData();
    isFirstRender.current = false;
  }, []);

  // Fetches data based on changes to the dependency
  useEffect(() => {
    // fetchUserData(); // Currently logged in User data
    // UserControls.getPublicUserData(userId, setUser); // Other User data

    if (!isFirstRender.current && user?.id) {
      if (user?.showPlants) {
        // fetchUserData();
        UserControls.getPlants(user, setPlants);
      }
      if (user?.showForumPosts && user?.id) {
        // fetchUserData();
        UserControls.getPosts(setPosts, user.id);
      }
      if (user?.showMyMeetups) {
        // fetchUserData();
        UserControls.getMeetups(user, setMyMeetups);
      }
    }
  }, [user]);

  return (
    <>
      <TopBar />
      <Grid
        // border='1px solid red'
        id='lvl-one'
        className='placeholder'
      >
        <Box className='pub-box'>
          <HStack>
            <GridItem id='u-avatar-gi'>
              <Image
                id='u-avatar-img'
                src={user.avatar}
                alt={`${user.userName}'s avatar`}
              />
            </GridItem>

            <VStack>
              <Heading id='g-heading' className='u-heading'>
                {user.userName}
              </Heading>
              <Text className='u-text'>{user.bio}</Text>
            </VStack>
          </HStack>
        </Box>

        {/* ***************************************  */}
        <VStack spacing={4} align='center'>
          {user?.showPlants && (
            <Box
              // border='5px solid red'
              className='pub-box'
            >

              <Heading id='g-heading' className='u-heading'>
                My Newest Plants
              </Heading>
              {plants.length > 0 ? (
                <Grid className='pub-grid'>
                  {plants.slice(-6).map((plant) => (
                    <Card key={plant.id} id='g-card' className='pub-card'>
                      <CardHeader textAlign={'center'}>
                        <Heading size='md'>{plant.nickname}</Heading>
                      </CardHeader>
                      <CardBody textAlign={'center'}>
                        {plant.imageUrl && (
                          <Center>
                            <Box id='pub-imgBox'>
                              <img
                                id='pub-img'
                                src={plant.imageUrl}
                                alt={`${plant.nickname}`}
                              />
                            </Box>
                          </Center>
                        )}
                        <Text className='u-text'>
                          <em>{plant.description}</em>
                        </Text>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              ) : (
                <Text className='u-text'>No Plants Available</Text>
              )}
            </Box>
          )}

          {/* ***************************************  */}

          {user?.showMyMeetups && (
            <Box
              // border='5px solid red'
              className='pub-box'
            >

              <Heading id='g-heading' className='u-heading'>
                My Hosted Meetups
              </Heading>
              {myMeetups.length > 0 ? (
                <Grid className='pub-grid'>
                  {myMeetups.slice(-6).map((meetup) => (
                    <Card key={meetup.id} id='g-card' className='pub-card'>
                      <CardHeader textAlign={'center'}>
                        <Heading size='md'>{meetup.eventName}</Heading>
                      </CardHeader>
                      <CardBody textAlign={'center'}>
                        {meetup.imageUrl && (
                          <Center>
                            <Box id='pub-imgBox'>
                              <Image
                                id='pub-img'
                                src={meetup.imageUrl}
                                alt={meetup.eventName}
                              />
                            </Box>
                          </Center>
                        )}
                        <Text className='u-text'>{meetup.description}</Text>
                        <Text>
                          {meetup.location
                            .replace('State:', '-')
                            .replace('City:', '-')
                            .trim()}
                        </Text>
                        <Text className='u-text'>
                          Date & Time: {meetup.time_date}
                        </Text>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              ) : (
                <Text className='u-text'>No Meetups Available</Text>
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
            <Box
              // border='5px solid red'
              className='pub-box'
            >

              <Heading id='g-heading' className='u-heading'>
                My Recent Posts
              </Heading>
              {posts.length > 0 ? (
                <Grid className='pub-grid'>
                  {posts.slice(-6).map((post) => (
                    <Card key={post.id} id='g-card' className='pub-card'>
                      <CardBody textAlign={'center'}>
                        {post.imageUrl && (
                          <Center>
                            <Box id='pub-imgBox'>
                              <Image
                                id='pub-img'
                                src={post.imageUrl}
                                alt={`Post ${post.id}`}
                                objectFit='contain'
                              />
                            </Box>
                          </Center>
                        )}
                        <Text className='u-text'>{post.message}</Text>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              ) : (
                <Text className='u-text'>No Forum Posts Available</Text>
              )}
            </Box>
          )}

          {/* ***************************************  */}
        </VStack>
      </Grid>
    </>
  );
};

export default UserPublicProfile;
