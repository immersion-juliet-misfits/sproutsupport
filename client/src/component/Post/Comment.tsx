import { SetStateAction, useState, useEffect, useRef } from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react';

const Comment = ({ postId, user, isOpen, onOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [comments, setComments] = useState([]);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitted, setSubmitted] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const comCancelRef = useRef();

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInput(e.target.value);
  };

  const isError = input === '';

  const addComment = () => {

    if (input === '') {
      setSubmitted(true);
      return;
    }
    setSubmitted(false);

    return axios
      .post('comment/comment', {
        message: input,
        postId,
        userId: user.id,
        username: user.userName,
      })
      .then((data) => {
        console.log('s', data);
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


  return (
    <Flex direction='column'>
      {comments.map((comment: object) => (
        <Flex
        id='post-flex'
        // border='1px solid red'
        // borderRadius='10px'
        // bg='#A3EECC'
        // margin='5px'
        // padding='5px'
        boxSize='large' key={comment.id}>
          <Box flex='1' alignSelf='left'>
            <Text>{comment.username}</Text>
            <Text
            fontSize='2xl'
            >{comment.message}</Text>
          </Box>
          {user.id === comment.userId && (
          <IconButton
            variant='contained'
            mt={2}
            onClick={onOpen}
            // onClick={() => {
            //   setSelectedCommentId(comment.id);
            //   onOpen();
            // }}
            icon={<DeleteIcon />}
            isDisabled={user.id !== comment.userId}
            aria-label={''}          />
           )}
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={comCancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='md' fontWeight='bold'>
                  Delete Comment
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={comCancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme='red'
                    onClick={() => {
                      deleteComment(comment.id);
                      // deleteComment(selectedCommentId);
                      onClose();
                    }}
                    onChange={onClose}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Flex>
      ))}
      <Box flexDirection='column'>
        <FormControl
        isInvalid={isError && submitted}
        >
          {/* <FormLabel>Comment</FormLabel> */}
          <Input
          id='g-input'
          type='post' value={input} onChange={handleInputChange} />
          {!isError ? (
            <FormHelperText>Press Submit to create comment.</FormHelperText>
          ) : (
            <FormErrorMessage>A comment is required.</FormErrorMessage>
          )}
          <Button
            mt={4}
            onClick={addComment}
            boxSize='small'
            isDisabled={input === ''}
          >
            Submit
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
};

export default Comment;
