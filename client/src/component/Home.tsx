import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Button,
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
  useDisclosure,
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
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { GrAddCircle } from 'react-icons/gr';
import Comment from './Post/Comment';
import TopBar from './UserProfile/TopBar';

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex>
        <IconButton
          variant='contained'
          size='sm'
          icon={<EditIcon />}
          // isDisabled={user.id !== post.userId}
          position='sticky'
          top={0}
          {...getEditButtonProps()}
        />
      </Flex>
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
      .catch((err) => {
        console.error('Failed to Delete message: ', err);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box w='1100px' mx='auto'>
      <TopBar />
      <Grid
        id='lvl-one'
        className='bodyGrid'
        // border='15px solid #D3FFEB'
        // bg='#D3FFEB'
        borderBottom='0'
        w='1100px'
        mx='auto'
        // borderRadius='lg lg 0 0'
        overflow='hidden'
        boxShadow='md'
        display='flex'
        alignItems='center'
      >
        {/* below are html for posts */}
        <Flex
          w='1100px'
          mx='auto'
          mt='0'
          borderRadius='0 0 lg lg'
          // border='15px solid #D3FFEB'
          borderTop='0'
          // bg='#5AB78D'
          gap={10}
          overflow='hidden'
          boxShadow='md'
          display='flex'
          flexDirection='column'
          // alignItems='center'
          justifyContent='center'
          py={4}
        >
          <ChakraLink
            as={ReactRouterLink}
            to='/createPost'
            position='fixed'
            bottom={5}
            right={40}
          >
            <GrAddCircle />
          </ChakraLink>
          <Flex direction='column-reverse' gap={5}>
            {posts.map((post) => {
              return (
                <Flex
                  id='post-box'
                  direction='column'
                  // bg='#A3EECC'
                  // borderRadius='0 0 lg lg'
                  // w='900px'
                  mx='auto'
                  mt='0'
                  // alignItems='left'
                  gap={5}
                  key={post.id}
                  // rounded='true'
                >
                  <Card
                    // box-sizing='large'
                    // alignItems='left'
                    id='post-card'
                    // bg='#A3EECC'
                    key={post.id}
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                  >
                    <Image
                      src={post.imageUrl}
                      objectFit='cover'
                      maxW={{ base: '100%', sm: '100px' }}
                    />
                    <CardBody>
                      <Editable
                        textAlign='left'
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
                        <EditableControls />
                        <Input
                        // id='g-input'
                        as={EditableInput} />
                      <ChakraLink as={ReactRouterLink} to=''>
                        <Text fontSize={16}>{post.username}</Text>
                      </ChakraLink>
                        <EditablePreview />
                      </Editable>
                    </CardBody>
                    <CardFooter>
                      <IconButton
                        // position='top-right'
                        isRound={true}
                        variant='contained'
                        aria-label='Done'
                        fontSize='15px'
                        onClick={onOpen}
                        icon={<DeleteIcon />}
                        isDisabled={user.id !== post.userId}
                      />
                      <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
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
                              <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                              </Button>
                              <Button
                                colorScheme='red'
                                onClick={() => {
                                  deleteMessage(post.id);
                                }}
                                onChange={onClose}
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
                  <Flex direction='column'>
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
