import { Box, Flex, Spacer } from '@chakra-ui/react';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom'


const Post = () => {
  return (
    <div>
      <ChakraLink as={ReactRouterLink} to='/createPost'>
        Create Post
      </ChakraLink>
      <Flex
        flexDirection='column-reverse'
        alignItems='center'
        justifyContent='flex-end'
      >
        <Box>
          <div>Post1</div>
        </Box>
        <Box>
          <div>Post2</div>
        </Box>
        <Box>
          <div>Post3</div>
        </Box>
        <Box>
          <div>Post4</div>
        </Box>
      </Flex>
    </div>
  );
};

export default Post;
