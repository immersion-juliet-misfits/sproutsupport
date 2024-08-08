import { SetStateAction, useState, useEffect } from 'react';
import axios from 'axios';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react';

const Comment = ({postId}) => {
  const [input, setInput] = useState('');
  const [comments, setComments] = useState([]);

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => setInput(e.target.value);

  const isError = input === '';

  const addComment = () => {
    return axios
      .post('comment/comment', {message: input, postId})
      .then(() => {
        console.log('comment success')
      })
      .catch((err) => {
        console.error('Failed to POST comment: ', err);
      });
  }

  const getComments = () => {
    axios
      .get('/comment/comment')
      .then(({ data }) => {
        // console.log('data', data);
        setComments(data);
      })
      .catch((err) => {
        console.error('Failed to GET post: ', err);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>

    <Flex>
        {comments.map((comment) => {
          <div>{comment.message}</div>
        })}
      <FormControl isInvalid={isError}>
        <FormLabel>Comment</FormLabel>
        <Input type='post' value={input} onChange={handleInputChange} />
        {!isError ? (
          <FormHelperText>
            Press Submit to create comment.
          </FormHelperText>
        ) : (
          <FormErrorMessage>A comment is required.</FormErrorMessage>
        )}
        <Button mt={4} onClick={addComment}>
          Submit
        </Button>
      </FormControl>
    </Flex>
  </div>
  );
};

export default Comment;