import { useState, useEffect, useRef, MutableRefObject } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Box,
  Image,
  Text,
  Grid,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Input,
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  useEditableControls,
} from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import Comment from './Post/Comment';
import TopBar from './UserProfile/TopBar';
import { RiPlantFill } from "react-icons/ri";


const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [postId, setPostId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const comCancelRef = useRef();
  // console.log('pi', postId);
  function EditableControls(e: any) {

    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
        <IconButton
          onClick={() => {
            setMessage(message);
            updateMessage(postId);
          }}
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Button
        size='sm'
        value='Update'
        hidden={user.id !== postId}
        {...getEditButtonProps()}
      >
        Update
      </Button>
    );
  }

  const getPosts = () => {
    axios
      .get('/post/post')
      .then(({ data }) => {
        // console.log('data', data);
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
      .then(() => console.log('Delete'))
      .catch((err) => {
        console.error('Failed to Delete message: ', err);
      });
  };

  useEffect(() => {
    getPosts();
  }, [postId]);

  return (
    <Box w='1100px' mx='auto'>
      <TopBar route={''} />
      <Grid
        className='bodyGrid'
        borderBottom='0'
        w='1100px'
        mx='auto'
        borderRadius='lg lg 0 0'
        overflow='hidden'
        boxShadow='md'
        display='flex'
        alignItems='center'
      >
        {/* below are html for posts */}
        <Flex
          id='lvl-one'
          justifyContent='center'
        >
          <ChakraLink
            as={ReactRouterLink}
            to='/createPost'
            position='fixed'
            bottom={20}
            right={30}
            >
            <IconButton fontSize="3xl" width="70px" height="70px" position="absolute" size="lg" top="-5" right="-5" zIndex="10" bgColor='#4AAD52' color="#d5e8ce" icon={<><RiPlantFill />+</>} isRound={true} aria-label='New Plant'>New Plant</IconButton>
          </ChakraLink>
          <Flex direction='column-reverse' id='lvl-two' gap={5} >
            {posts.map((post) => {
              return (
                <Flex
                  direction='column'
                  key={post.id}
                >
                  <Card
                    bg='#6EB257'
                    key={post.id}
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    padding={4}
                  >
                    <Image
                      src={post.imageUrl}
                      objectFit='cover'
                      maxW={{ base: '100%', sm: '200px' }}
                    />
                    <CardBody>
                      <Editable
                        textAlign='left'
                        defaultValue={post.message}
                        onClick={() => {setPostId(post.userId)}}
                        // onChange={(newMessage) => {
                        //   setMessage(newMessage);
                        // }}
                        fontSize='2xl'
                        isPreviewFocusable={false}
                      >
                        <EditableControls />
                        <Input as={EditableInput} />
                        <ChakraLink as={ReactRouterLink} to=''>
                          <Text
                            color='brown'
                            fontSize={12}
                          >{`@${post.username}`}</Text>
                        </ChakraLink>
                        <EditablePreview />
                      </Editable>
                    </CardBody>
                    <CardFooter>
                      <Button hidden={user.id !== post.userId} bgColor='red' onClick={onOpen}>
                        Delete
                      </Button>
                      <AlertDialog
                        isOpen={isOpen}
                        onClose={onClose}
                        leastDestructiveRef={comCancelRef}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize='md' fontWeight='bold'>
                              Delete Post
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure? You can't undo this action
                              afterwards.
                            </AlertDialogBody>
                            <AlertDialogFooter>
                              <Button ref={comCancelRef} onClick={onClose}>
                                Cancel
                              </Button>
                              <Button
                                colorScheme='red'
                                onClick={() => {
                                  deleteMessage(post.id);
                                  onClose();
                                }}
                                ml={3}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                  <Flex direction='column' padding={4}>
                    <Comment
                      postId={post.id}
                      user={user}
                      isOpen={isOpen}
                      onOpen={onOpen}
                      onClose={onClose}
                    />
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
};

export default Home;
