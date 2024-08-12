import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Flex,
  Box,
  Image,
  Text,
  VStack,
  Heading,
  Grid,
  GridItem,
  IconButton,
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
import NavBar from './NavBar';

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
      <Flex >
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
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

  const handleDelete = (id: string) => {
    deleteMessage(id);
  };

  useEffect(() => {
    getPosts();
  }, []);

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
            Posts
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
      {/* below are html for posts */}

      <Box bg='teal' py={4} >
        <ChakraLink as={ReactRouterLink} to='/createPost'>
          Create Post
        </ChakraLink>
        <Flex alignItems='center' gap='2' direction='column-reverse'>
        {posts
          .map((post) => {
            return (
              <li key={post.id} >
                <Flex
                  // box-sizing='border-box'
                  alignItems='center'
                  justifyContent='space-between'
                  bg='#c1e3c9'
                  // grow={3}
                >
                  {/* <div>{post.imageUrl}</div> */}
                  <Box >
                    <Image
                      src={post.imageUrl}
                      // sizes='(max-width: 40px) 80px, 120px'
                      boxSize='180px'
                      />
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
                      isRound={true}
                      variant='solid'
                      colorScheme='yellow'
                      aria-label='Done'
                      fontSize='20px'
                      onClick={() => {
                        handleDelete(post.id);
                      }}
                      icon={<DeleteIcon />}
                    />
                  </Box>
                  <Comment postId={post.id}/>

                </Flex>
              </li>
            );
          })
        }
      </Flex>
      </Box>
    </Grid>
  );
};

export default Home;

