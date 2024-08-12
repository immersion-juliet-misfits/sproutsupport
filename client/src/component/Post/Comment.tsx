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
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const Comment = ({ postId }) => {
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
      .post('comment/comment', { message: input, postId })
      .then(() => {
        // console.log('s', data)
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
        // console.log('data', data);
        setComments(data);
      })
      .catch((err) => {
        console.error('Failed to GET post: ', err);
      });
  };

  const renderComments = () => {
    return comments.map((comment: object) => (
      <Flex color='black' key={comment.id}>
        <Box flex='1' >
          <Text>{comment.message}</Text>
        </Box>
        <Center w='100px' >
          <Text>
            <IconButton
              mt={4}
              onClick={() => {
                deleteComment(comment.id);
              }}
              icon={<DeleteIcon />}
            />
          </Text>
        </Center>
      </Flex>
    ));
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

  return (
    <div>
      <Grid
        h='200px'
        templateRows='repeat(2, 1f)'
        templateColumns='repeat(5, 1f)'
        gap={4}
      >
        <GridItem colSpan={3} >{renderComments()}</GridItem>
        <GridItem colSpan={1} >
        <FormControl isInvalid={isError}>
          <FormLabel>Comment</FormLabel>
          <Input type='post' value={input} onChange={handleInputChange} />
          {!isError ? (
            <FormHelperText>Press Submit to create comment.</FormHelperText>
          ) : (
            <FormErrorMessage color='yellow'>A comment is required.</FormErrorMessage>
          )}
          <Button mt={4} onClick={addComment}>
            Submit
          </Button>
        </FormControl>
      </GridItem>
      </Grid>

    </div>
  );
};

export default Comment;
