import {
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import { Box, Flex } from '@chakra-ui/react';
import { IconButton, Image } from '@chakra-ui/react';

const Post = () => {
  const [posts, setPosts] = useState([]);
  // console.log('post', posts);

  const getPosts = () => {
    axios
      .get('/post/post')
      .then(({ data }) => {
        // console.log('get data', data)
        setPosts(data);
      })
      .catch((err) => {
        console.error('Failed to GET post: ', err);
      });
  };

  const updatePost = () => {
    axios
      .patch('/post:id', posts)
      .then(({ data }) => {
        setPosts(data);
      })
      .catch((err) => {
        console.error('Failed to Update message: ', err);
      });
  };

  const deleteMessage = () => {
    axios
      .delete('/post:id')
      .then(() => {
        console.log('post deleted');
      })
      .catch((err) => {
        console.error('Failed to Delete message: ', err);
      });
  };

  useEffect(() => {
    getPosts();
  });

  return (
    <div>
      <ul>
        {posts.map((post) => {
         return (
           <li key={post.id}>
            <Flex
              flexDirection='column-reverse'
              alignItems='center'
              justifyContent='flex-end'
            >
              {/* <Image>Picture</Image> */}
              <Box>
                <div>Picture</div>
                <div>{post.message}</div>
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
            </Flex>
          </li>
          )
        }).reverse()}
        </ul>
        </div>
  );
};

export default Post;
