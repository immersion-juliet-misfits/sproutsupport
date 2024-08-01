import { Box, Flex } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';



const Post = () => {

  return (
    <div>
      <Flex
        flexDirection='column-reverse'
        alignItems='center'
        justifyContent='flex-end'
      >
        <Box>
          <div></div>
          <IconButton
          isRound={true}
          variant='solid'
          colorScheme='red'
          aria-label='Done'
          fontSize='20px'
          // icon={}
        />
        <IconButton
          isRound={true}
          variant='solid'
          colorScheme='blue'
          aria-label='Done'
          fontSize='20px'
          // icon={}
        />
        </Box>
        <Box>
          <div>Post2</div>
          <IconButton
          isRound={true}
          variant='solid'
          colorScheme='red'
          aria-label='Done'
          fontSize='20px'
          // icon={}
        />
        <IconButton
          isRound={true}
          variant='solid'
          colorScheme='blue'
          aria-label='Done'
          fontSize='20px'
          // icon={}
        />
        </Box>
        <Box>
          <div>Post3</div>
          <IconButton
          isRound={true}
          variant='solid'
          colorScheme='red'
          aria-label='Done'
          fontSize='20px'
          // icon={}
        />
        <IconButton
          isRound={true}
          variant='solid'
          colorScheme='blue'
          aria-label='Done'
          fontSize='20px'
          // icon={}
        />
        </Box>
        <Box>
          <div>Post4</div>
          <IconButton
          isRound={true}
          variant='solid'
          colorScheme='red'
          aria-label='Done'
          fontSize='20px'
          // icon={}
        />
        <IconButton
          isRound={true}
          variant='solid'
          colorScheme='blue'
          aria-label='Done'
          fontSize='20px'
          // icon={}
        />
        </Box>
      </Flex>
    </div>
  );
};

export default Post;
