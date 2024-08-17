import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Flex,
  Box,
  Image,
  Text,
  VStack,
  Heading,
  Grid,
  GridItem,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import {
  Input,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  ButtonGroup,
  useEditableControls,
} from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import Comment from './Post/Comment';
// import NavBar from './NavBar';
import TopBar from './UserProfile/TopBar';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  const getPosts = () => {
    axios
      .get('/post/post')
      .then(({ data }) => {
        console.log('data', data);
        setPosts(data);
      })
      .catch((err) => {
        console.error('Failed to GET post: ', err);
      });
  };

  const updateMessage = (id: string) => {
    axios
      .patch(`/post/post${id}`, { message })
      .then(() => {
        getPosts();
      })
      .catch((err) => {
        console.error('Failed to Update message: ', err);
      });
  };

  const deleteMessage = (id: string) => {
    axios
      .delete(`/post/post/${id}`)
      .then(() => {
        getPosts();
      })
      .catch((err) => {
        console.error('Failed to Delete message: ', err);
      });
  };

  const handleDelete = (id: string) => {
    deleteMessage(id);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box w='1100px' mx='auto' >
      <TopBar/>
      <Grid
        w='1100px'
        mx='auto'
        mt={10}
        p={5}
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        boxShadow='md'
        bg='#D3FFEB'
      >
        {/* below are html for posts */}

        <Flex  py={4} direction='column'>
          <ChakraLink as={ReactRouterLink} to='/createPost'>
            Create Post
          </ChakraLink>
          <Flex
            alignItems='center'
            gap='2'
            direction='column-reverse'
            justify='center'
            bg='#5AB78D'
          >
            {posts.map((post) => {
              return (
                <Card
                  // box-sizing='large'
                  alignItems='center'
                  bg='#A3EECC'
                  key={post.id}
                  direction='column'
                >
                  <CardBody boxSize='380px'>
                    {/* <CardBody > */}
                    <Image src={post.imageUrl} boxSize='360'/>
                  </CardBody>
                  <Stack mt='6' spacing='3'>
                    <Flex flexDirection='row' align='left'>
                      <Editable
                        textAlign='center'
                        defaultValue={post.message}
                        onSubmit={() => {
                          updateMessage(post.id);
                        }}
                        onChange={(newMessage) => {
                          setMessage(newMessage);
                        }}
                        fontSize='2xl'
                        isPreviewFocusable={false}
                      >
                        <EditablePreview />
                        <Input as={EditableInput} />
                        <EditableControls />
                      </Editable>
                      <IconButton
                        size='small'
                        isRound={true}
                        variant='solid'
                        // colorScheme='yellow'
                        aria-label='Done'
                        fontSize='15px'
                        onClick={() => {
                          handleDelete(post.id);
                        }}
                        icon={<DeleteIcon />}
                      />
                    </Flex>
                  </Stack>
                  <CardFooter>
                    <Flex direction='column'>
                      <Comment postId={post.id} />
                    </Flex>
                  </CardFooter>
                </Card>
              );
            })}
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
};

export default Home;
