import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  userName: string;
  avatar: string;
  bio: string | null;
  city: string | null;
  state: string | null;
  showPlants: boolean;
  showForumPosts: boolean;
  showMyMeetups: boolean;
}

const UserPublicProfile = () => {
  const { username } = useParams();
  const [publicUser, setPublicUser] = useState<User | null>(null);

  const [plants, setPlants] = useState([]);
  const [posts, setPosts] = useState([]);
  const [myMeetups, setMyMeetups] = useState([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (username) {
      UserControls.getPublicUserData(username, (data) => {
        setPublicUser(data.user);
      });
    }
    isFirstRender.current = false;
  }, [username]);

  useEffect(() => {
    if (!isFirstRender.current && publicUser?.id) {
      if (publicUser?.showPlants) {
        UserControls.getPlants(publicUser, setPlants);
      }
      if (publicUser?.showForumPosts && publicUser?.id) {
        UserControls.getPosts(setPosts, publicUser.id);
      }
      if (publicUser?.showMyMeetups) {
        UserControls.getMeetups(publicUser, setMyMeetups);
      }
    }
  }, [publicUser]);

  if (!publicUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TopBar route={`${publicUser.userName || ''}'s Public Profile`} />

      {/* User's Avatar and Info */}
      <Box className='pub-top-box'>
        <HStack className='pub-top-hstack'>
          <GridItem id='u-avatar-gi'>
            <Image
              id='u-avatar-img'
              src={publicUser.avatar}
              alt={`${publicUser.userName || 'User'}'s avatar`}
            />
          </GridItem>

          <VStack className='u-vstack'>
            <Heading
              id='g-heading'
              className='u-heading3'
            >
              {publicUser.userName}
            </Heading>
            <Text className='u-text'>
              {publicUser.bio || 'No bio available'}
            </Text>
          </VStack>
        </HStack>
      </Box>
      <Grid id='lvl-one'>
        {/* User's Plants */}
        <VStack
          spacing={4}
          align='center'
        >
          {publicUser?.showPlants && (
            <Box className='pub-box'>
              <Heading
                id='g-heading'
                className='u-heading3'
              >
                Newest Plants
              </Heading>
              {plants.length > 0 ? (
                <Grid className='pub-grid'>
                  {plants.slice(-6).map((plant) => (
                    <Card
                      key={plant.id}
                      id='g-card'
                      className='pub-card'
                    >
                      <CardHeader className='pub-cardHeader'>
                        <Heading className='pub-header'>
                          {plant.nickname}
                        </Heading>
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

          {/* User's Meetups */}
          {publicUser?.showMyMeetups && (
            <Box className='pub-box'>
              <Heading
                id='g-heading'
                className='u-heading3'
              >
                Hosted Meetups
              </Heading>
              {myMeetups.length > 0 ? (
                <Grid className='pub-grid'>
                  {myMeetups.slice(-6).map((meetup) => (
                    <Card
                      key={meetup.id}
                      id='g-card'
                      className='pub-card'
                    >
                      <CardHeader className='pub-cardHeader'>
                        <Heading className='pub-header'>
                          {meetup.eventName}
                        </Heading>
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

          {/* User's Forum Posts */}
          {publicUser?.showForumPosts && (
            <Box className='pub-box'>
              <Heading
                id='g-heading'
                className='u-heading3'
              >
                Recent Posts
              </Heading>
              {posts.length > 0 ? (
                <Grid className='pub-grid'>
                  {posts.slice(-6).map((post) => (
                    <Card
                      key={post.id}
                      id='g-card'
                      className='pub-card'
                    >
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
