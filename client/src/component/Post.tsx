import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex } from '@chakra-ui/react';
import { IconButton, Image } from '@chakra-ui/react';



const Post = () => {
  const [post, setPost] = useState({});

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

  const updatePost = () => {
    axios
      .patch('/post:id', post)
      .then(({data}) => {
        setPost(data);
      })
      .catch((err) => {
        console.error('Failed to POST message: ', err);
      });
  };

  const deleteMessage = () => {
    axios
      .delete('/post:id', post)
      .then(() => {
        console.log('post deleted');
      })
      .catch((err) => {
        console.error('Failed to POST message: ', err);
      });
  };

  useEffect(() => {
    getPost();
  });

  return (
    <div>
      <Flex
        flexDirection='column-reverse'
        alignItems='center'
        justifyContent='flex-end'
      >
        {/* <Image>Picture</Image> */}
        <Box>
          <div>Picture</div>
          <div>Post1</div>
          <IconButton
          isRound={true}
          variant='solid'
          colorScheme='red'
          aria-label='Done'
          fontSize='20px'
          onClick={deleteMessage}
          // icon={}
          />
        <IconButton
          isRound={true}
          variant='solid'
          colorScheme='blue'
          aria-label='Done'
          fontSize='20px'
          onClick={updatePost}
          // icon={}
          />
        </Box>
        <Box>
        <div>Picture</div>
          <div>Post2</div>
          <IconButton
          isRound={true}
          variant='solid'
          colorScheme='red'
          aria-label='Done'
          fontSize='20px'
          // icon={}
          // icon={}
        />
        <IconButton
          isRound={true}
          variant='solid'
          colorScheme='blue'
          aria-label='Done'
          fontSize='20px'
          // icon={}
          // icon={}
        />
        </Box>
        <Box>
          <div>Picture</div>
          <div>Post3</div>
          <IconButton
          isRound={true}
          variant='solid'
          colorScheme='red'
          aria-label='Done'
          fontSize='20px'
          // icon={}
          // icon={}
        />
        <IconButton
          isRound={true}
          variant='solid'
          colorScheme='blue'
          aria-label='Done'
          fontSize='20px'
          // icon={}
          // icon={}
        />
        </Box>
        <Box>
          <div>Picture</div>
          <div>Post4</div>
          <IconButton
          isRound={true}
          variant='solid'
          colorScheme='red'
          aria-label='Done'
          fontSize='20px'
          // icon={}
          // icon={}
        />
        <IconButton
          isRound={true}
          variant='solid'
          colorScheme='blue'
          aria-label='Done'
          fontSize='20px'
          // icon={}
          // icon={}
        />
        </Box>
      </Flex>
    </div>
  );
};

export default Post;
