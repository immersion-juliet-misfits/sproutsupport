import { SetStateAction, useState, useEffect } from 'react';
import axios from 'axios';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  IconButton,
  Button,
  Flex,
  Grid,
  GridItem,
  Box,
  Center,
  Text,
  Container,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const Comment = ({ postId, user }) => {
  const [input, setInput] = useState('');
  const [comments, setComments] = useState([]);

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInput(e.target.value);
  };

  const isError = input === '';

  const addComment = () => {
    return axios
      .post('comment/comment', { message: input, postId, userId: user.id, username: user.userName })
      .then((data) => {
        console.log('s', data)
        getComments();
      })
      .then(() => {
        setInput('');
      })
      .catch((err) => {
        console.error('Failed to POST comment: ', err);
      });
  };

  const getComments = () => {
    axios
      .get(`/comment/comment/${postId}`)
      .then(({ data }) => {
        // console.log('Cdata', data);
        setComments(data);
      })
      .catch((err) => {
        console.error('Failed to GET post: ', err);
      });
  };

  const deleteComment = (id: string) => {
    return axios
      .delete(`/comment/comment/${id}`)
      .then(() => {
        // console.log('deleted message')
        getComments();
      })
      .catch((err) => {
        console.error('Failed to Delete message: ', err);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

// const isEmpty = (input: string) => { return input === '' }

  return (
    <Flex direction='column'>
      { comments.map((comment: object) => (
        <Flex boxSize='large' key={comment.id}>
          <Box flex='1' alignSelf='left'>
            <Text>{comment.username}</Text>
            <Text>{comment.message}</Text>
          </Box>
          {/* <Center w='100px'> */}
            <Text>
              <IconButton
              // boxSize='small'
                variant='contained'
                mt={2}
                onClick={() => {
                  deleteComment(comment.id);
                }}
                icon={<DeleteIcon />}
                isDisabled={user.id !== comment.userId}
              />
            </Text>
          {/* </Center> */}
        </Flex>
      ))}
      <Box flexDirection='column'>
        <FormControl isInvalid={isError}>
          {/* <FormLabel>Comment</FormLabel> */}
          <Input type='post' value={input} onChange={handleInputChange} />
          {!isError ? (
            <FormHelperText>Press Submit to create comment.</FormHelperText>
          ) : (
            <FormErrorMessage>
              A comment is required.
            </FormErrorMessage>
          )}
          <Button mt={4} onClick={addComment} boxSize='small' isDisabled={input === ''}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
};

export default Comment;
