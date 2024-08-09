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
      .then(({ data }) => {
        // console.log('s', data)
        getComments();
      })
      .then(() => { setInput('')})
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
      <div key={comment.id}>
        {comment.message}
        <IconButton
          mt={4}
          onClick={() => {
            deleteComment(comment.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
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
      {renderComments()}

      <Flex>
        <FormControl isInvalid={isError}>
          <FormLabel>Comment</FormLabel>
          <Input type='post' value={input} onChange={handleInputChange} />
          {!isError ? (
            <FormHelperText>Press Submit to create comment.</FormHelperText>
          ) : (
            <FormErrorMessage>A comment is required.</FormErrorMessage>
          )}
          <Button
            mt={4}
            onClick={addComment}
          >
            Submit
          </Button>
        </FormControl>
      </Flex>
    </div>
  );
};

export default Comment;
