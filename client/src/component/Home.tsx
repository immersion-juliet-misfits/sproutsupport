import { Box, Flex } from '@chakra-ui/react';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import Post from './Post/Post';
import Nav from './NavBar';

const Home = () => {
  return (
    <div>
      {/* <Flex justify='justify-content' align='center'> */}
        <Nav />
        <Box>
          <ChakraLink as={ReactRouterLink} to='/createPost'>
            Create Post
          </ChakraLink>
          <Post />
        </Box>
      {/* </Flex> */}
    </div>
  );
};

export default Home;
