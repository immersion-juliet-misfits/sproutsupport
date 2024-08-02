import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import Post from './Post';
import Nav from './NavBar';

const Home = () => {

  return (
    <div>
      <Nav />
    <Box>
      <ChakraLink as={ReactRouterLink} to='/createPost'>
        Create Post
      </ChakraLink>
      <Post />
    </Box>
    </div>
  );
};

export default Home;
