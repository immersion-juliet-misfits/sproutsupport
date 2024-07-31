import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import Post from './Post';

const Home = () => {
  const [post, setPost] = useState('');

  const getPost = () => {
    axios
      .get('/post')
      .then(({ data }) => {
        setPost(data);
      })
      .catch((err) => {
        console.error('Failed to GET post: ', err);
      });
  };

  useEffect(() => {
    getPost();
  });
  
  return (
    <Box>
      <ChakraLink as={ReactRouterLink} to='/createPost'>
        Create Post
      </ChakraLink>
      <Post />
    </Box>
  );
};

export default Home;
